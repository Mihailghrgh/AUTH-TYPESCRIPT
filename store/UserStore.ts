import { create, useStore } from "zustand";

type User = {
  email: string;
  created_at: string;
  id: string;
};

type activeUser = {
  user: User | null;
  setUser: (user: User) => void;
};

export const UserStore = create<activeUser>((set) => ({
  user: null,
  setUser: (user) => {
    return set({ user });
  },
}));
