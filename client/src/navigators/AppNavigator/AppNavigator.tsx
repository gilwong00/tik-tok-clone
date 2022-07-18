import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScreenNames } from '../../@types';
import {
  CameraScreen,
  DiscoverScreen,
  FeedScreen,
  InboxScreen,
  ProfileScreen
} from '../../screens';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

type AppNavigatorProps = {
  [ScreenNames.FEED]: undefined;
  [ScreenNames.ADD]: undefined;
  [ScreenNames.PROFILE]: undefined;
  [ScreenNames.DISCOVER]: undefined;
  [ScreenNames.INBOX]: undefined;
};

const Tab = createBottomTabNavigator<AppNavigatorProps>();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={ScreenNames.FEED}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName;

          switch (route.name) {
            case ScreenNames.FEED:
              iconName = focused ? 'home' : 'home-outline';
              break;
            case ScreenNames.DISCOVER:
              iconName = focused ? 'search' : 'search-outline';
              break;
            case ScreenNames.ADD:
              iconName = focused ? 'md-add-circle' : 'md-add-circle-outline';
              break;
            case ScreenNames.PROFILE:
              iconName = focused ? 'person' : 'person-outline';
              break;
            case ScreenNames.INBOX:
              iconName = focused ? 'chatbox' : 'chatbox-outline';
              break;
            default:
              iconName = focused ? 'home' : 'home-outline';
              break;
          }

          return <Ionicons name={iconName} size={24} color='#fff' />;
        },
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarStyle: styles.tabBarStyle,
        tabBarItemStyle: styles.tabBarItemStyle,
        tabBarShowLabel: true,
        tabBarIconStyle: styles.tabBarIconStyle
      })}
    >
      <Tab.Screen name={ScreenNames.FEED} component={FeedScreen} />
      <Tab.Screen name={ScreenNames.DISCOVER} component={DiscoverScreen} />
      <Tab.Screen
        options={{ headerShown: false }}
        name={ScreenNames.ADD}
        component={CameraScreen}
      />
      <Tab.Screen name={ScreenNames.INBOX} component={InboxScreen} />
      <Tab.Screen
        name={ScreenNames.PROFILE}
        options={{ headerShown: false }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
