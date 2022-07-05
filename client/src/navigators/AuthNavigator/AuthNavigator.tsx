import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthScreen } from '../../screens';
import { ScreenNames } from '../../@types';
import { SafeContainer } from '../../components';

type AuthNavigatorProps = {
  [ScreenNames.AUTH]: undefined;
};

const Stack = createStackNavigator<AuthNavigatorProps>();

const Auth = () => {
  return (
    <SafeContainer>
      <Stack.Navigator
        screenOptions={{
          title: '',
          headerShown: false
        }}
      >
        <Stack.Screen name={ScreenNames.AUTH} component={AuthScreen} />
      </Stack.Navigator>
    </SafeContainer>
  );
};

export default Auth;
