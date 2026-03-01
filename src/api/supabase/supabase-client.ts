import { createClient } from '@supabase/supabase-js';
import { messages } from '@/common/constants/messages';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(messages.errors.missingSupabaseEnv);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
