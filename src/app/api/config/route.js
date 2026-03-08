import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function GET() {
    const supabase = getSupabase();
    try {
        const { data, error } = await supabase
            .from('site_config')
            .select('*')
            .order('id', { ascending: true })
            .limit(1)
            .single();

        if (error) {
            console.warn('Supabase row missing or error, providing defaults:', error.message);
            // Provide sensible defaults if DB is empty
            return NextResponse.json({
                youtubeLinks: [
                    "https://www.youtube.com/watch?v=LXb3EKWsInQ",
                    "https://www.youtube.com/watch?v=tgbNymZ7vqY",
                    "https://www.youtube.com/watch?v=jNQXAC9IVRw",
                    "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                ],
                adImages: [
                    { src: "/images/ad1.png", label: "Advertisement 1" },
                    { src: "/images/ad2.png", label: "Advertisement 2" },
                    { src: "/images/ad3.png", label: "Advertisement 3" },
                    { src: "/images/ad4.png", label: "Advertisement 4" }
                ],
                enrollmentPrices: { main: 1999, side: 1499, couple: 2999, kid: 999 }
            });
        }

        // Map database fields to frontend camelCase if necessary
        const config = {
            youtubeLinks: data.youtube_links,
            adImages: data.ad_images,
            enrollmentPrices: data.enrollment_prices
        };

        return NextResponse.json(config);
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req) {
    const supabase = getSupabase();
    try {
        const newData = await req.json();

        const { error } = await supabase
            .from('site_config')
            .upsert({
                id: 1, // Fixed ID for global config
                youtube_links: newData.youtubeLinks,
                ad_images: newData.adImages,
                enrollment_prices: newData.enrollmentPrices,
                updated_at: new Date().toISOString()
            });

        if (error) {
            console.error('Supabase error saving config:', error);
            return NextResponse.json({ error: error.message || 'Failed to update database' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Config updated successfully' });
    } catch (error) {
        console.error('API Server Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

