/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createContactUsSubmission = /* GraphQL */ `
  mutation CreateContactUsSubmission(
    $input: CreateContactUsSubmissionInput!
    $condition: ModelContactUsSubmissionConditionInput
  ) {
    createContactUsSubmission(input: $input, condition: $condition) {
      id
      type
      content
      email
      recaptcha
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateContactUsSubmission = /* GraphQL */ `
  mutation UpdateContactUsSubmission(
    $input: UpdateContactUsSubmissionInput!
    $condition: ModelContactUsSubmissionConditionInput
  ) {
    updateContactUsSubmission(input: $input, condition: $condition) {
      id
      type
      content
      email
      recaptcha
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteContactUsSubmission = /* GraphQL */ `
  mutation DeleteContactUsSubmission(
    $input: DeleteContactUsSubmissionInput!
    $condition: ModelContactUsSubmissionConditionInput
  ) {
    deleteContactUsSubmission(input: $input, condition: $condition) {
      id
      type
      content
      email
      recaptcha
      createdAt
      updatedAt
      owner
    }
  }
`;
