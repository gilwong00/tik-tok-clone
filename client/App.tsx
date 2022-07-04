import React from 'react';
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator } from './src/navigators';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
