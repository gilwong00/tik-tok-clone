import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenNames } from '../../@types';
import { SafeContainer } from '../../components';
import { SavePostScreen } from '../../screens';

type PostNavigatorProps = {
  [ScreenNames.SAVE_POST]: undefined;
};

const Stack = createStackNavigator<PostNavigatorProps>();

const PostNavigator = () => {
  return (
    <SafeContainer>
      <Stack.Navigator
        screenOptions={{
          title: '',
          headerShown: false
        }}
      >
        <Stack.Screen name={ScreenNames.SAVE_POST} component={SavePostScreen} />
      </Stack.Navigator>
    </SafeContainer>
  );
};

export default PostNavigator;
