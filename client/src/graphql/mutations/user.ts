import { gql } from '@apollo/client';
import { USER_PARTS } from '../fragments/user';

export const CREATE_USER = gql`
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      input: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
      }
    ) {
      id
    }
  }
`;

export const AUTH_USER = gql`
  mutation Authuser($email: String!, $password: String!) {
    authUser(input: { email: $email, password: $password }) {
      authToken {
        accessToken
        expiredAt
      }
      user {
        ...UserParts
      }
    }
  }
  ${USER_PARTS}
`;
