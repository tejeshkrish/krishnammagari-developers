import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Plot {
  id: string;
  plot_number: number;
  width: string;
  height: string;
  status: 'available' | 'reserved' | 'sold';
  created_at: string;
  updated_at: string;
}

export interface Inquiry {
  name: string;
  email: string;
  phone: string;
  message: string;
}
