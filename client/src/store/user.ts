import create from 'zustand';

interface UserStore {
  user: any | null;
  setUser: (user: any) => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  setUser: (user: any) => set(state => ({ ...state, user }))
}));
