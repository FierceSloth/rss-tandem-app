import { supabase } from '@/api/supabase/supabase-client';

let isAuthenticated: boolean = false;

const initAuth = async (): Promise<void> => {
  const { data } = await supabase.auth.getSession();
  isAuthenticated = !!data.session;
};

const setIsAuthenticated = (value: boolean): void => {
  isAuthenticated = value;
};

supabase.auth.onAuthStateChange((_, session) => {
  isAuthenticated = !!session;
});

export const authStore = {
  isAuthenticated: (): boolean => isAuthenticated,
  setIsAuthenticated,
  initAuth,
};
