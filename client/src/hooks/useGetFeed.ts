import { QueryObserverOptions, useQuery } from 'react-query';
import { getFeed } from '../api';

interface UseFeedParams {
  limit: number;
  cursor?: number | undefined;
  config?: QueryObserverOptions;
}

export const useGetFeed = ({ limit, cursor, config }: UseFeedParams) => {
  return useQuery({
    queryFn: () => getFeed(limit, cursor),
    ...config
  });
};
