import { useQuery } from 'react-query';
import { QueryConfig } from '../@types';
import { searchUsers } from '../api';

interface UseSearchUserParams {
  query?: string;
  config?: QueryConfig<typeof searchUsers>;
}

export const useSearchUsers = ({ query, config }: UseSearchUserParams) => {
  return useQuery({
    queryFn: () => searchUsers(query ?? ''),
    enabled: (query ?? '').length > 2,
    ...config
  });
};
