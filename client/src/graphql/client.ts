import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { storage } from '../utils';
import Constants from 'expo-constants';
import { STORAGE_KEYS } from '../@types';
import { useUserStore } from '../store';
const { manifest } = Constants;

// const httpLink = createHttpLink({
//   uri: 'http://localhost:8080/query'
// });

const apiEndpoint =
  typeof manifest?.packagerOpts === `object` && manifest?.packagerOpts.dev
    ? manifest?.debuggerHost?.split(`:`).shift()?.concat(`:8080`)
    : `http://localhost:8080`;

const httpLink = createHttpLink({
  uri: `http://${apiEndpoint}/query`
});

const authLink = setContext(async (_, { headers }) => {
  let token = '';

  try {
    token = await storage.load<string>({ key: STORAGE_KEYS.TOKEN });
  } catch (err) {
    token = '';
    useUserStore().setAuthUser(null);
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
