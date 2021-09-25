/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getContactUsSubmission = /* GraphQL */ `
  query GetContactUsSubmission($id: ID!) {
    getContactUsSubmission(id: $id) {
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
export const listContactUsSubmissions = /* GraphQL */ `
  query ListContactUsSubmissions(
    $filter: ModelContactUsSubmissionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContactUsSubmissions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        content
        email
        recaptcha
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
