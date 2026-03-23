import { supabase } from '@/api/supabase/supabase-client';
import type { Session } from '@supabase/supabase-js';
import { messages } from '@/common/constants/messages';

export interface IAuthResult {
  success: boolean;
  error?: string;
}

export interface IAuthService {
  register(username: string, email: string, password: string): Promise<IAuthResult>;
  isUsernameTaken(username: string): Promise<boolean>;
  login(loginOrEmail: string, password: string): Promise<IAuthResult>;
  logout(): Promise<void>;
  getSession(): Promise<Session | null>;
}

class AuthService implements IAuthService {
  public async register(username: string, email: string, password: string): Promise<IAuthResult> {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error || !data.user) {
      return { success: false, error: messages.errors.registrationFailed };
    }

    if (data.user.identities?.length === 0) {
      return { success: false, error: messages.errors.emailAlreadyExists };
    }

    const saved = await this.createProfile(data.user.id, username, email);

    if (!saved) {
      return { success: false, error: messages.errors.profileSaveError };
    }

    return { success: true };
  }

  public async isUsernameTaken(username: string): Promise<boolean> {
    const { data, error } = await supabase.from('profiles').select('id').eq('username', username).single();

    if (error) return false;

    return data !== null;
  }

  public async login(loginOrEmail: string, password: string): Promise<IAuthResult> {
    const email = await this.resolveEmail(loginOrEmail);

    if (!email) {
      return { success: false, error: messages.errors.userNotFound };
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  }

  public async logout(): Promise<void> {
    await supabase.auth.signOut();
  }

  public async getSession(): Promise<Session | null> {
    const { data } = await supabase.auth.getSession();
    return data.session;
  }

  private async createProfile(userId: string, username: string, email: string): Promise<boolean> {
    const { error } = await supabase.from('profiles').upsert({ id: userId, username, email });

    return !error;
  }

  private async resolveEmail(loginOrEmail: string): Promise<string | null> {
    if (loginOrEmail.includes('@')) return loginOrEmail;

    const { data, error } = await supabase.from('profiles').select('email').eq('username', loginOrEmail).single();

    return error || !data ? null : (data.email as string);
  }
}

export const authService = new AuthService();
