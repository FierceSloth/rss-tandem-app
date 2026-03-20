import { supabase } from '@/api/supabase/supabase-client';
import type { Session } from '@supabase/supabase-js';
import { messages } from '@/common/constants/messages';

export interface IAuthResult {
  success: boolean;
  error?: string;
}

export const authService = {
  async register(username: string, email: string, password: string): Promise<IAuthResult> {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error || !data.user) {
      return { success: false, error: messages.auth.errors.registrationFailed };
    }

    if (data.user.identities?.length === 0) {
      return { success: false, error: messages.auth.errors.emailAlreadyExists };
    }

    const { error: profileError } = await supabase.from('profiles').upsert({ id: data.user.id, username, email });

    if (profileError) {
      return { success: false, error: messages.auth.errors.profileSaveError };
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
        return { success: false, error: messages.auth.errors.userNotFound };
      }

      email = data.email as string;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  },

  async logout(): Promise<void> {
    await supabase.auth.signOut();
  },

  async getSession(): Promise<Session | null> {
    const { data } = await supabase.auth.getSession();
    return data.session;
  },
};
