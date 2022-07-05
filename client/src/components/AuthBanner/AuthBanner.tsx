import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { AuthMode } from '../../@types';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
  mode: AuthMode;
  handleBannerClick: () => void;
};

const AuthBanner: React.FC<Props> = ({ mode, handleBannerClick }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBannerClick}>
        {mode === AuthMode.LOGIN ? (
          <Text style={styles.bannerText}>
            Don't have an account?{' '}
            <Text style={styles.cta}>Click here to Sign up</Text>
          </Text>
        ) : (
          <Text style={styles.bannerText}>
            Already have an account?{' '}
            <Text style={styles.cta}>Click here to Log in</Text>
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AuthBanner;
