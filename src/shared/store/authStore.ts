// store/authStore.ts
import type { User } from "@supabase/supabase-js";
import { create } from "zustand";
import { signIn, signOut, signUp } from "../api/auth";
import { supabase } from "../api/supabase";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => ReturnType<typeof signIn>;
  signUp: (email: string, password: string) => ReturnType<typeof signUp>;
  signOut: () => Promise<void>;
  initialize: () => Promise<() => void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  signIn: async (email, password) => {
    const result = await signIn(email, password);
    if (result.data.user) set({ user: result.data.user });
    return result;
  },

  signUp: async (email, password) => {
    const result = await signUp(email, password);
    if (result.data.user) set({ user: result.data.user });
    return result;
  },

  signOut: async () => {
    await signOut();
    set({ user: null });
  },

  initialize: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    set({ user: session?.user ?? null, isLoading: false });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      set({ user: session?.user ?? null });
    });

    return () => subscription.unsubscribe();
  },
}));
