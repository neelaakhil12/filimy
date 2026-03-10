import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function check() {
    const { data, error } = await supabase.from('actor_registrations').select('*').limit(1);
    console.log("Select Error:", error?.message);
    if (!error) console.log("Rows exist:", data.length);
}
check();
