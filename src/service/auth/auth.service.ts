import { supabase } from '@/api/supabase/supabase-client';
import type { Session } from '@supabase/supabase-js';
import { STORAGE_KEYS } from '@/common/constants/constants';

export interface IAuthResult {
  success: boolean;
  error?: string;
}

export const authService = {
  async register(username: string, email: string, password: string): Promise<IAuthResult> {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error || !data.user) {
      return { success: false, error: error?.message ?? 'Registration failed' };
    }

    if (data.user.identities?.length === 0) {
      return { success: false, error: 'User with this email already exists' };
    }

    const { error: profileError } = await supabase.from('profiles').upsert({ id: data.user.id, username, email });

    if (profileError) {
      return { success: false, error: profileError.message };
    }

    const { data: sessionData } = await supabase.auth.getSession();
    if (sessionData.session) {
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(sessionData.session.user));
    }

    return { success: true };
  },

  async isUsernameTaken(username: string): Promise<boolean> {
    const { data, error } = await supabase.from('profiles').select('id').eq('username', username).single();

    if (error) {
      return false;
    }

    return data !== null;
  },

  async login(loginOrEmail: string, password: string): Promise<IAuthResult> {
    let email = loginOrEmail;

    if (!loginOrEmail.includes('@')) {
      const { data, error } = await supabase.from('profiles').select('email').eq('username', loginOrEmail).single();

      if (error || !data) {
        return { success: false, error: 'User not found' };
      }

      email = data.email as string;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return { success: false, error: error.message };
    }

    const { data: sessionData } = await supabase.auth.getSession();
    if (sessionData.session) {
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(sessionData.session.user));
    }

    return { success: true };
  },

  async logout(): Promise<void> {
    await supabase.auth.signOut();
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  },

  async getSession(): Promise<Session | null> {
    const { data } = await supabase.auth.getSession();
    return data.session;
  },
};
