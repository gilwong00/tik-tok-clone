import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import { styles } from './styles';

type Props = {
  children: React.ReactNode;
};

const SafeContainer: React.FC<Props> = ({ children }) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

export default SafeContainer;
