import { MutationHookOptions, useMutation } from '@apollo/client';
import { CREATE_POST } from '../graphql';

export const useCreatePost = (config?: MutationHookOptions) => {
  const [createPost, { data, loading, error }] = useMutation(CREATE_POST, {
    ...config
  });

  return {
    createPost,
    data,
    loading,
    error
  };
};
