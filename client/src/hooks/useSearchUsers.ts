import { QueryObserverOptions, useQuery } from 'react-query';
import { searchUsers } from '../api';

interface UseSearchUserParams {
  query: string;
  config?: QueryObserverOptions;
}

export const useSearchUsers = ({ query, config }: UseSearchUserParams) => {
  return useQuery({
    queryFn: () => searchUsers(query ?? ''),
    enabled: query.length >= 2,
    // staleTime: 1000,
    keepPreviousData: true,
    ...config
  });
};
