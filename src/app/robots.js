export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://movielifez.com'}/sitemap.xml`,
    };
}
