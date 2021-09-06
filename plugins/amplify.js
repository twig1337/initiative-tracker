import abstractor from "@/src/graphql/abstractor"
import Amplify from '@aws-amplify/core'
import config from '../aws-exports'

Amplify.configure(config)

export default (ctx, inject) => {
  inject('contactUs', abstractor('ContactUsSubmission'))
}
