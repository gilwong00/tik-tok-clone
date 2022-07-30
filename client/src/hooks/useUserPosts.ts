import { QueryHookOptions, useQuery } from '@apollo/client';
import { GET_USER_POSTS } from '../graphql';

interface Params {
  userId: string;
  config?: QueryHookOptions;
}

export const useUserPosts = ({ userId, config }: Params) => {
  const { loading, error, data, refetch } = useQuery(GET_USER_POSTS, {
    variables: {
      userId
    },
    ...config,
    skip: !userId.length
  });

  return {
    loading,
    error,
    data,
    refetch
  };
};
