import { gql } from '@apollo/client';
import { USER_PARTS } from '../fragments/user';

export const GET_USER = gql`
  query getUser($userId: String!) {
    getUser(userId: $userId) {
      ...UserParts
    }
  }
  ${USER_PARTS}
`;
