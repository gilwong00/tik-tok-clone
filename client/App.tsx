import React, { useEffect, useState } from 'react';
// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator, HomeNavigator } from './src/navigators';
import { useUserStore } from './src/store';
import { ApolloProvider } from '@apollo/client';
import { client, GET_USER } from './src/graphql';
import { ActivityIndicator, Text, View } from 'react-native';
import { COLORS } from './src/constants';
import { storage } from './src/utils';
import { STORAGE_KEYS, User } from './src/@types';

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user, setUser } = useUserStore();

  // useEffect(() => {
  //   const initApp = async () => {
  //     const token = await storage.load<string>({ key: STORAGE_KEYS.TOKEN });
  //     // fetch active user
  //     if (token.length && !user) {
  //       const { data } = await client.query<User>({
  //         query: GET_USER,
  //         variables: {
  //           token
  //         }
  //       });

  //       if (data) {
  //         setUser(data);
  //         setIsLoading(false);
  //       }
  //     }
  //   };

  //   initApp();
  // }, [user]);

  // if (isLoading) {
  //   return (
  //     <View
  //       style={{
  //         position: 'absolute',
  //         top: '50%',
  //         left: 0,
  //         right: 0
  //       }}
  //     >
  //       <ActivityIndicator size='large' color={COLORS.CORAL_RED} />
  //     </View>
  //   );
  // }

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        {user ? <HomeNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </ApolloProvider>
  );
}
