import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenNames } from '../../@types';
import { SafeContainer } from '../../components';
import { PostNavigator } from '../PostNavigator';
import { AppNavigator } from '../AppNavigator';

type AuthNavigatorProps = {
  [ScreenNames.SAVE_POST]: undefined;
  [ScreenNames.HOME]: undefined;
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
      <Stack.Screen name={ScreenNames.SAVE_POST} component={PostNavigator} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
