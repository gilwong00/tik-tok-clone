import { gql } from '@apollo/client';

export const POST_PARTS = gql`
  fragment PostParts on Post {
    id
    userId
    description
    uri
    thumbnailUri
  }
`;
