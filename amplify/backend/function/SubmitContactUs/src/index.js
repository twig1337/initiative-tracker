const awsServerlessExpress = require('aws-serverless-express')
const app = require('./app')

const server = awsServerlessExpress.createServer(app)

exports.handler = (event, context) => {
  if (event.httpMethod !== 'POST') {
    throw new Error(`Method ${event.httpMethod} is not supported for this resource.`)
  }

  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise
}
