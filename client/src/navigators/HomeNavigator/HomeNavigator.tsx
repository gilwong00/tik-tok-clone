import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenNames } from '../../@types';
import { SafeContainer } from '../../components';
import { AppNavigator } from '../AppNavigator';
import { SavePostScreen } from '../../screens';

type AuthNavigatorProps = {
  [ScreenNames.HOME]: undefined;
  [ScreenNames.SAVE_POST]: undefined;
};

const Stack = createStackNavigator<AuthNavigatorProps>();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={ScreenNames.HOME}
      screenOptions={{
        title: '',
        headerShown: false
      }}
    >
      <Stack.Screen name={ScreenNames.HOME} component={AppNavigator} />
      <Stack.Screen name={ScreenNames.SAVE_POST} component={SavePostScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
