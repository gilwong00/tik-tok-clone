import create from 'zustand';
import { AuthResponse, User } from '../@types';

interface UserStore {
  user: User | null;
  setAuthUser: (auth: AuthResponse) => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  setAuthUser: (auth: AuthResponse) => {
    // set token in storage

    set(state => ({ ...state, user: auth.user }));
  }
}));
