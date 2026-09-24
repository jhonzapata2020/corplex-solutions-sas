import { createClient } from '@supabase/supabase-js';

const rawUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseUrl =
  rawUrl && rawUrl.trim() !== ''
    ? rawUrl
    : 'https://grfjnmpkoezeyhjhrzkw.supabase.co';

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'sb_publishable_FSpWxlR-VroEmMKOV2Tl9w_p2tpOcJJ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
