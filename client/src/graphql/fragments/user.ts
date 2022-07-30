import { gql } from '@apollo/client';

export const USER_PARTS = gql`
  fragment UserParts on User {
    id
    firstName
    lastName
    email
  }
`;
