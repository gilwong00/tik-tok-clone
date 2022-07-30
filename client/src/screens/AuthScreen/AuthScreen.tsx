import React, { useCallback, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from 'react-native';
import { styles } from './styles';
import { AuthBanner } from '../../components';
import { AuthMode, AuthResponse } from '../../@types';
import { useUserStore } from '../../store';
import { useAuthUser } from '../../hooks';
import { ApolloError } from '@apollo/client';
import { COLORS } from '../../constants';

const AuthScreen = () => {
  const [mode, setMode] = useState<AuthMode>(AuthMode.LOGIN);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { setAuthUser } = useUserStore();
  const { authUser, loading } = useAuthUser({
    onCompleted: ({ authUser }: { authUser: AuthResponse }) => {
      setAuthUser(authUser);
    },
    onError: (error: ApolloError) => {
      console.log('error', error);
      // throw some toast
    }
  });

  const handleBannerClick = useCallback(
    () =>
      setMode((prev: AuthMode) =>
        prev === AuthMode.LOGIN ? AuthMode.SIGNUP : AuthMode.LOGIN
      ),
    []
  );

  const handleSubmit = useCallback(async () => {
    if (email.length && password.length) {
      await authUser({
        variables: {
          email,
          password
        }
      });
    }
  }, [email, password]);

  const authText: string = mode === AuthMode.LOGIN ? 'Log In' : 'Sign Up';

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{authText}</Text>
      <View style={styles.formContainer}>
        <TextInput
          onChangeText={text => setEmail(text)}
          style={styles.textInput}
          placeholder='Email'
          value={email}
          autoCapitalize='none'
        />
        <TextInput
          onChangeText={text => setPassword(text)}
          style={styles.textInput}
          placeholder='Password'
          value={password}
          secureTextEntry
          autoCapitalize='none'
        />
        <TouchableOpacity
          style={styles.authBtn}
          onPress={handleSubmit}
          disabled={loading || !email.length || !password.length}
        >
          {loading ? (
            <ActivityIndicator size='small' color={COLORS.WHITE} />
          ) : (
            <Text style={styles.authBtnText}>{authText}</Text>
          )}
        </TouchableOpacity>
      </View>

      <AuthBanner mode={mode} handleBannerClick={handleBannerClick} />
    </View>
  );
};

export default AuthScreen;
