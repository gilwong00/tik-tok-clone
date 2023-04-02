import { useQuery } from 'react-query';
import { QueryConfig } from '../@types';
import { getFeed, getUserPosts } from '../api';

interface UseFeedParams {
  limit: number;
  cursor?: number | undefined;
  config?: QueryConfig<typeof getUserPosts>;
}

export const useGetFeed = ({ limit, cursor, config }: UseFeedParams) => {
  return useQuery({
    queryFn: () => getFeed(limit, cursor),
    ...config
  });
};
