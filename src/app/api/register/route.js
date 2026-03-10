import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

// Helper for status update
export async function PUT(req) {
    try {
        const { id, status } = await req.json();
        const supabase = getSupabase();

        if (!id || !status) {
            return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('actor_registrations')
            .update({ status })
            .eq('id', id);

        if (error) {
            console.error("Supabase update error:", error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: 'Status updated successfully' });
    } catch (error) {
        console.error("API error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const formData = await req.json();
        const supabase = getSupabase();

        // Ensure we are inserting only the fields we expect
        const { fullName, age, gender, location, pincode, experience, languages, fullPhoto, halfPhoto, passportPhoto, characterType, paymentScreenshot, phone, email } = formData;

        const { data, error } = await supabase
            .from('actor_registrations')
            .insert([
                {
                    full_name: fullName,
                    age: age ? parseInt(age) : null,
                    gender,
                    location,
                    pincode,
                    experience,
                    languages,
                    full_photo: fullPhoto,
                    half_photo: halfPhoto,
                    passport_photo: passportPhoto,
                    character_type: characterType,
                    payment_screenshot: paymentScreenshot,
                    phone,
                    email,
                    status: 'Pending'
                }
            ]);

        if (error) {
            console.error("Supabase insert error:", error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: 'Registration saved successfully' });
    } catch (error) {
        console.error("API error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const supabase = getSupabase();
        const { data, error } = await supabase
            .from('actor_registrations')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Supabase fetch error:", error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ data });
    } catch (error) {
        console.error("API error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { id } = await req.json();
        const supabase = getSupabase();

        if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

        const { error } = await supabase.from('actor_registrations').delete().eq('id', id);

        if (error) {
            console.error("Supabase delete error:", error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("API error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
