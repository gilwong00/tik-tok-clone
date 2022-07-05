import React, { useCallback, useState } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { styles } from './styles';
import { AuthBanner } from '../../components';
import { AuthMode, ScreenNames } from '../../@types';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '../../store';

const AuthScreen = () => {
  const [mode, setMode] = useState<AuthMode>(AuthMode.LOGIN);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { setUser } = useUserStore();

  const handleBannerClick = useCallback(
    () =>
      setMode((prev: AuthMode) =>
        prev === AuthMode.LOGIN ? AuthMode.SIGNUP : AuthMode.LOGIN
      ),
    []
  );

  const handleSubmit = useCallback(() => {
    console.log('hitt');
    // TODO: add call to api once backend is setup
    if (email.length && password.length) {
      setUser({ email, password });
    }
  }, []);

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
        <TouchableOpacity style={styles.authBtn} onPress={handleSubmit}>
          <Text style={styles.authBtnText}>{authText}</Text>
        </TouchableOpacity>
      </View>

      <AuthBanner mode={mode} handleBannerClick={handleBannerClick} />
    </View>
  );
};

export default AuthScreen;
