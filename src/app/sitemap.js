export default function sitemap() {
    const baseUrl = 'https://movielifez.com';

    const routes = [
        '',
        '/about',
        '/services',
        '/register',
        '/request',
        '/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
    }));

    return routes;
}
