import React, { useEffect, useState } from 'react';
// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator, HomeNavigator } from './src/navigators';
import { useUserStore } from './src/store';
import { ApolloProvider } from '@apollo/client';
import { client } from './src/graphql';
import { ActivityIndicator, View } from 'react-native';
import { COLORS } from './src/constants';
import { promiseHandler, storage } from './src/utils';
import { STORAGE_KEYS, User } from './src/@types';
import { QueryClient, QueryClientProvider } from 'react-query';
import { whoami } from './src/api';

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [queryClient] = useState(new QueryClient());
  const { user, setUser, setAuthToken } = useUserStore();

  useEffect(() => {
    const initApp = async () => {
      try {
        const token = await storage.load<string>({ key: STORAGE_KEYS.TOKEN });
        setAuthToken(token);
        // fetch active user
        if (token.length && !user) {
          const [authUser, err] = await promiseHandler<User, Error>(whoami());
          if (err !== null) throw err;
          if (authUser) {
            setUser(authUser);
            setIsLoading(false);
          }
        }
      } catch (err) {
        setUser(null);
        setIsLoading(false);
      }
    };

    initApp();
  }, [user]);

  if (isLoading) {
    return (
      <View
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0
        }}
      >
        <ActivityIndicator size='large' color={COLORS.CORAL_RED} />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          {user ? <HomeNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </ApolloProvider>
    </QueryClientProvider>
  );
}
