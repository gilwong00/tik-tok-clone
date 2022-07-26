import { SafeAreaView } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { styles } from './styles';

const SafeContainer: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

export default SafeContainer;
