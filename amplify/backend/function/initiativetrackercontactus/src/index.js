const aws = require('aws-sdk')
const ses = new aws.SES()

exports.handler = async (event) => {
  for (const streamedItem of event.Records) {
    if (streamedItem.eventName === 'INSERT') {

      const type = streamedItem.dynamodb.NewImage.type.S
      const content = streamedItem.dynamodb.NewImage.content.S

      let userEmail = streamedItem.dynamodb.NewImage.email
      userEmail = userEmail ? userEmail.S : 'no-reply'

      await ses
        .sendEmail({
          Destination: {
            ToAddresses: [process.env.SES_DEFAULT_TO_ADDRESS],
          },
          Source: process.env.SES_DEFAULT_TO_ADDRESS,
          Message: {
            Subject: { Data: `Contact Us Submission [${type}]` },
            Body: {
              Text: { Data: `${type} submission from ${userEmail}. ${content}` },
            },
          },
        })
        .promise()
    }
  }

  return { status: 'done' }
}
