/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["RECAPTCHA_SECRET_KEY"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
const AWS = require('aws-sdk')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const bodyParser = require('body-parser')
const express = require('express')
const { v4: uuidv4 } = require('uuid')

AWS.config.update({ region: process.env.TABLE_REGION })

const dynamodb = new AWS.DynamoDB.DocumentClient()
const ses = new AWS.SES()

let tableName = "ContactUsSubmissions"
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV
}

const path = "/contact-us"

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
})

app.post(path, async function(req, res) {
  const recaptchaSecret = (await (new AWS.SSM())
    .getParameter({
      Name: process.env.RECAPTCHA_SECRET_KEY,
      WithDecryption: true,
    })
    .promise())
    .Parameter
    .Value

  const token = req.body.recaptcha ?? null
  if (!token) {
    res.statusCode = 400
    res.json({ error: 'Missing ReCaptcha token' })
    return
  }

  try {
    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${token}`)
    const data = await response.json()

    if (!data.success) {
      console.log('Recaptcha Data:', data)
      res.statusCode = 400
      res.json({ error: 'Invalid ReCaptcha token' })
      return
    }
  } catch (e) {
    console.log('ReCaptcha error:', e)
    res.statusCode = 500
    res.json({ error: 'ReCaptcha internal error' })
    return
  }

  delete req.body.recaptcha
  req.body.id = uuidv4()
  req.body.createdAt = new Date().toISOString()

  const putItemParams = {
    TableName: tableName,
    Item: req.body
  }

  dynamodb.put(putItemParams, async (error) => {
    if (error) {
      res.statusCode = 500
      res.json({ error })
      return
    }

    const toEmail = 'taellsworth@gmail.com'
    const userEmail = req.body.userEmail ? req.body.userEmail : 'no-reply'

    await ses
      .sendEmail({
        Destination: {
          ToAddresses: [toEmail],
        },
        Source: toEmail,
        Message: {
          Subject: { Data: `Contact Us Submission [${req.body.type}]` },
          Body: {
            Text: { Data: `${req.body.type} submission from ${userEmail}. ${req.body.content}` },
          },
        },
      })
      .promise()

    res.json({ success: 'Contact us successfully submitted' })
  })
})


app.listen(3000)

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
