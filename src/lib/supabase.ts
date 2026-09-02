import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://corplex-solutions.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_FSpWxlR-VroEmMKOV2Tl9w_p2tpOcJJ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
