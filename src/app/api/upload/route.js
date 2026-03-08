import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function POST(req) {
    const supabase = getSupabase();
    // Diagnostic Logging (visible in your terminal)
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    console.log('--- Upload Diagnostic ---');
    console.log('URL:', url);
    console.log('Key Length:', key?.length);
    if (key) {
        const parts = key.split('.');
        console.log('JWT Sections:', parts.length);
        if (parts.length === 3) {
            console.log('Signature Length:', parts[2].length);
        }
    }
    console.log('-------------------------');

    try {
        const formData = await req.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `ads/${fileName}`;

        const buffer = await file.arrayBuffer();

        const { data, error: uploadError } = await supabase.storage
            .from('ads')
            .upload(filePath, buffer, {
                contentType: file.type,
                upsert: false
            });

        if (uploadError) {
            console.error('SERVER UPLOAD ERROR:', uploadError.message);
            return NextResponse.json({ error: uploadError.message || 'Signature verification failed' }, { status: 500 });
        }

        const { data: { publicUrl } } = supabase.storage
            .from('ads')
            .getPublicUrl(filePath);

        return NextResponse.json({ url: publicUrl });
    } catch (error) {
        console.error('CRITICAL SERVER ERROR:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
