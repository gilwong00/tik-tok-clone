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
import { COLORS } from '../../constants';
import { useMutation } from 'react-query';
import {
  AuthUserPayload,
  CreateUserPayload,
  authUser,
  createUser
} from '../../api';

const AuthScreen = () => {
  const [mode, setMode] = useState<AuthMode>(AuthMode.LOGIN);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { setAuthUser } = useUserStore();
  const createUserMutation = useMutation(
    (payload: CreateUserPayload) => createUser(payload),
    {
      onSuccess() {
        setMode(AuthMode.LOGIN);
        resetState();
      }
    }
  );
  const authUserMutation = useMutation(
    (payload: AuthUserPayload) => authUser(payload),
    {
      onSuccess(data: AuthResponse) {
        resetState();
        setAuthUser(data);
      }
    }
  );

  const resetState = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  const handleBannerClick = useCallback(
    () =>
      setMode((prev: AuthMode) =>
        prev === AuthMode.LOGIN ? AuthMode.SIGNUP : AuthMode.LOGIN
      ),
    []
  );

  const handleSubmit = useCallback(async () => {
    const isSignUp = mode === AuthMode.SIGNUP;
    const payload = isSignUp
      ? {
          firstName,
          lastName,
          email,
          password
        }
      : {
          email,
          password
        };
    // TODO add payload validation
    if (isSignUp) {
      return await createUserMutation.mutateAsync(payload as CreateUserPayload);
    }
    return await authUserMutation.mutateAsync(payload as AuthUserPayload);
  }, [email, password]);

  const authText: string = mode === AuthMode.LOGIN ? 'Log In' : 'Sign Up';

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{authText}</Text>
      <View style={styles.formContainer}>
        {mode === AuthMode.SIGNUP && (
          <>
            <TextInput
              onChangeText={text => setFirstName(text)}
              style={styles.textInput}
              placeholder='First Name'
              value={firstName}
              autoCapitalize='none'
            />
            <TextInput
              onChangeText={text => setLastName(text)}
              style={styles.textInput}
              placeholder='Last Name'
              value={lastName}
              autoCapitalize='none'
            />
          </>
        )}
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
          returnKeyType='done'
        />
        <TouchableOpacity
          style={styles.authBtn}
          onPress={handleSubmit}
          disabled={
            authUserMutation.isLoading ||
            createUserMutation.isLoading ||
            !email.length ||
            !password.length
          }
        >
          {authUserMutation.isLoading || createUserMutation.isLoading ? (
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
