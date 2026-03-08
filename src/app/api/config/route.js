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
            console.error('Supabase fetch error:', error.message);
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
                enrollmentPrices: {
                    main: { price: 1999, contract: '1 Year Contract', prize: '10 Lakhs Prize Money', ads: '10+ Ads' },
                    side: { price: 1499, contract: '1 Year Contract', prize: '5 Lakhs Prize Money', ads: '10+ Ads' },
                    couple: { price: 2999, contract: '1 Year Contract', prize: '10 Lakhs Prize Money', ads: '10+ Ads' },
                    kid: { price: 999, contract: '1 Year Contract', prize: '3 Lakhs Prize Money', ads: '10+ Ads' },
                    paymentQR: '/images/payment-qr.png'
                }
            });
        }

        // Map database fields and parse stringified JSON if stored in text arrays
        const config = {
            youtubeLinks: data.youtube_links || [],
            adImages: (data.ad_images || []).map(ad => {
                try {
                    return typeof ad === 'string' ? JSON.parse(ad) : ad;
                } catch (e) {
                    return ad;
                }
            }),
            enrollmentPrices: (() => {
                let parsed = typeof data.enrollment_prices === 'string'
                    ? JSON.parse(data.enrollment_prices)
                    : (data.enrollment_prices || null);

                if (parsed && typeof parsed.main === 'number') {
                    parsed = {
                        main: { price: parsed.main || 1999, contract: '1 Year Contract', prize: '10 Lakhs Prize Money', ads: '10+ Ads' },
                        side: { price: parsed.side || 1499, contract: '1 Year Contract', prize: '5 Lakhs Prize Money', ads: '10+ Ads' },
                        couple: { price: parsed.couple || 2999, contract: '1 Year Contract', prize: '10 Lakhs Prize Money', ads: '10+ Ads' },
                        kid: { price: parsed.kid || 999, contract: '1 Year Contract', prize: '3 Lakhs Prize Money', ads: '10+ Ads' },
                        paymentQR: '/images/payment-qr.png'
                    };
                } else if (!parsed) {
                    parsed = {
                        main: { price: 1999, contract: '1 Year Contract', prize: '10 Lakhs Prize Money', ads: '10+ Ads' },
                        side: { price: 1499, contract: '1 Year Contract', prize: '5 Lakhs Prize Money', ads: '10+ Ads' },
                        couple: { price: 2999, contract: '1 Year Contract', prize: '10 Lakhs Prize Money', ads: '10+ Ads' },
                        kid: { price: 999, contract: '1 Year Contract', prize: '3 Lakhs Prize Money', ads: '10+ Ads' },
                        paymentQR: '/images/payment-qr.png'
                    };
                }
                return parsed;
            })()
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

