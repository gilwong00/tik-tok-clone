import {
  ApolloCache,
  gql,
  MutationHookOptions,
  useMutation
} from '@apollo/client';
import { AUTH_USER } from '../graphql';

export const useAuthUser = (config?: MutationHookOptions) => {
  const [authUser, { data, loading, error }] = useMutation(AUTH_USER, {
    ...config
    // update(cache: ApolloCache<Cache>, { data: { addTodo } }) {
    //   cache.modify({
    //     fields: {
    //       todos(existingTodos = []) {
    //         const newTodoRef = cache.writeFragment({
    //           data: addTodo,
    //           fragment: gql`
    //             fragment NewTodo on Todo {
    //               id
    //               type
    //             }
    //           `
    //         });
    //         return [...existingTodos, newTodoRef];
    //       }
    //     }
    //   });
    // }
  });

  return {
    authUser,
    data,
    loading,
    error
  };
};
