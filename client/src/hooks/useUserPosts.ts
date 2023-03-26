import { useQuery } from 'react-query';
import { QueryConfig } from '../@types';
import { getUserPosts } from '../api';

interface UseUserPostsParams {
  userId: number | null;
  config?: QueryConfig<typeof getUserPosts>;
}

export const useUserPosts = ({ userId, config }: UseUserPostsParams) => {
  return useQuery({
    queryFn: () => getUserPosts(userId ?? 0),
    enabled: userId !== null,
    ...config
  });
};
