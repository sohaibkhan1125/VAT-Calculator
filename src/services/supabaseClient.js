import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

console.log('🔍 Supabase Client Initialization:');
console.log('  URL:', supabaseUrl ? '✅ Loaded' : '❌ Missing');
console.log('  Anon Key:', supabaseAnonKey ? '✅ Loaded' : '❌ Missing');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!');
  console.error('Make sure you have:');
  console.error('  REACT_APP_SUPABASE_URL in your .env file');
  console.error('  REACT_APP_SUPABASE_ANON_KEY in your .env file');
  console.error('And restart the dev server after creating .env');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
console.log('✅ Supabase client created');
