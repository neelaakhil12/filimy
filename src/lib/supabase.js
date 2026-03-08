import { createClient } from '@supabase/supabase-js'

export const getSupabase = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
        console.error('Supabase URL or Anon Key is missing. Check your .env file.')
    }

    return createClient(supabaseUrl, supabaseAnonKey)
}

// Fallback for existing imports
export const supabase = typeof window !== 'undefined' ? getSupabase() : null;
