-- Run this in your Supabase SQL Editor
CREATE TABLE IF NOT EXISTS actor_registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    age INTEGER,
    gender TEXT,
    location TEXT,
    pincode TEXT,
    experience TEXT,
    languages TEXT,
    full_photo TEXT,
    half_photo TEXT,
    passport_photo TEXT,
    character_type TEXT,
    payment_screenshot TEXT,
    phone TEXT NOT NULL,
    email TEXT,
    status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Active', 'Rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE actor_registrations ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust as needed for security)
-- Allow anyone to insert (since it's a public form)
CREATE POLICY "Allow public insert" ON actor_registrations FOR INSERT WITH CHECK (true);

-- Allow admins (or anon for development) to read
CREATE POLICY "Allow public read" ON actor_registrations FOR SELECT USING (true);
