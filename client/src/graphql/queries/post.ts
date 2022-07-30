import { gql } from '@apollo/client';
import { POST_PARTS } from '../fragments';

export const GET_FEED = gql`
  query GetFeed($userId: String!, $page: Int!, $limit: Int!) {
    getFeed(userId: $userId, page: $page, limit: $limit) {
      ...PostParts
    }
  }
  ${POST_PARTS}
`;

export const GET_USER_POSTS = gql`
  query GetUserPosts($userId: ID!) {
    userPosts(userId: $userId) {
      ...PostParts
    }
  }
  ${POST_PARTS}
`;
