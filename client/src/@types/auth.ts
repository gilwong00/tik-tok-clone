export enum AuthMode {
  LOGIN = 'login',
  SIGNUP = 'signup'
}

export interface AuthToken {
  accessToken: string;
  expiredAt: Date;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatarUri: string;
}

export interface AuthResponse {
  authToken: AuthToken;
  user: User;
}
