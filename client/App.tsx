import React from 'react';
// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator, HomeNavigator } from './src/navigators';
import { useUserStore } from './src/store';
import { ApolloProvider } from '@apollo/client';
import { client } from './src/graphql';

export default function App() {
  const { user } = useUserStore();

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        {user ? <HomeNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </ApolloProvider>
  );
}
