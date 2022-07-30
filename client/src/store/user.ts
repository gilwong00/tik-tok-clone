import create from 'zustand';
import { AuthResponse, User } from '../@types';
import { storage } from '../utils';

interface UserStore {
  user: User | null;
  setAuthUser: (auth: AuthResponse) => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  setAuthUser: async (auth: AuthResponse) => {
    await storage.save({
      key: 'token',
      data: auth.authToken.accessToken,
      expires: new Date(auth.authToken.expiredAt).getTime()
    });
    set(state => ({ ...state, user: auth.user }));
  }
}));
