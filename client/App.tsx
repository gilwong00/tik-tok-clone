import React from 'react';
// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator, HomeNavigator } from './src/navigators';
import { useUserStore } from './src/store';

export default function App() {
  const { user } = useUserStore();

  return (
    <NavigationContainer>
      {user ? <HomeNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
