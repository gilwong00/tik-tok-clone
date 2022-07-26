import React, { useCallback } from 'react';
// import { Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenNames } from '../../@types';
import { AppNavigator } from '../AppNavigator';
import { EditProfileScreen, SavePostScreen } from '../../screens';
import { useNavigation } from '@react-navigation/native';
// import { styles } from './styles';

type AuthNavigatorProps = {
  [ScreenNames.HOME]: undefined;
  [ScreenNames.SAVE_POST]: undefined;
  [ScreenNames.EDIT_PROFILE]: undefined;
};

const Stack = createStackNavigator<AuthNavigatorProps>();

const HomeNavigator = () => {
  const navigation = useNavigation();

  const handleProfileRedirect = useCallback(() => navigation.goBack(), []);

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
      <Stack.Screen
        name={ScreenNames.EDIT_PROFILE}
        component={EditProfileScreen}
        // options={{
        //   headerShown: true,
        //   headerBackTitleVisible: true,
        //   headerBackTitle: 'Profile',
        //   headerLeft: () => (
        //     <TouchableOpacity
        //       style={styles.editProfilBtn}
        //       onPress={handleProfileRedirect}
        //     >
        //       <Text>Profile</Text>
        //     </TouchableOpacity>
        //   )
        // }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
