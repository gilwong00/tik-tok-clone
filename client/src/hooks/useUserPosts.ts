import { QueryObserverOptions, useQuery } from 'react-query';
import { getUserPosts } from '../api';

interface UseUserPostsParams {
  userId: number | null;
  config?: QueryObserverOptions;
}

export const useUserPosts = ({ userId, config }: UseUserPostsParams) => {
  return useQuery({
    queryFn: () => getUserPosts(userId ?? 0),
    enabled: userId !== null,
    ...config
  });
};
