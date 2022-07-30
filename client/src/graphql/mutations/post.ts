import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation CreatePost(
    $userId: ID!
    $uri: String!
    $thumbnailUri: String!
    $description: String!
  ) {
    createPost(
      input: {
        userId: $userId
        description: $description
        uri: $uri
        thumbnailUri: $thumbnailUri
      }
    ) {
      id
      uri
      userId
      thumbnailUri
      description
    }
  }
`;
