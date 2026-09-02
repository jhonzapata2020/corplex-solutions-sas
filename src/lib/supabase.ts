import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL;

// Garantiza usar el proyecto real ehfejbgzronpllbeyzqj.supabase.co
// incluso si en la consola de Vercel existe una variable previa con el dominio provisional
const supabaseUrl =
  rawUrl && rawUrl.includes('ehfejbgzronpllbeyzqj')
    ? rawUrl
    : 'https://ehfejbgzronpllbeyzqj.supabase.co';

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_FSpWxlR-VroEmMKOV2Tl9w_p2tpOcJJ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
