import abstractor from "@/src/graphql/abstractor"
import Amplify from '@aws-amplify/core'
import config from '../aws-exports'

Amplify.configure(config)

// Temporary override to make the "Contact Us" function work until I need real auth support.
// Solution: https://github.com/aws-amplify/amplify-js/issues/1252#issuecomment-634521518
Amplify.configure({
  "aws_appsync_authenticationType": "AWS_IAM",
});

export default (ctx, inject) => {
  inject('contactUs', abstractor('ContactUsSubmission'))
}
