import create from 'zustand';
import { AuthResponse, STORAGE_KEYS, User } from '../@types';
import { storage } from '../utils';

interface UserStore {
  user: User | null;
  authToken: string;
  setAuthUser: (auth: AuthResponse | null) => void;
  setUser: (user: User | null) => void;
  setAuthToken: (token: string) => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  authToken: '',
  setAuthUser: async (auth: AuthResponse | null) => {
    if (auth) {
      await storage.save({
        key: STORAGE_KEYS.TOKEN,
        data: auth.authToken.accessToken,
        expires: new Date(auth.authToken.expiredAt).getTime()
      });
    }

    set(state => ({ ...state, user: auth?.user }));
  },
  setUser: (user: User | null) => set(state => ({ ...state, user })),
  setAuthToken: (token: string) =>
    set(state => ({ ...state, authToken: token }))
}));
