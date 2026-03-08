import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import SmoothScroll from "@/components/Transitions/SmoothScroll";
import PageTransition from "@/components/Transitions/PageTransition";
import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";

export const metadata = {
  metadataBase: new URL('https://movielifez.com'),
  title: {
    default: "Movielifez | Find the Perfect Actors for Your Next Project",
    template: "%s | Movielifez"
  },
  description: "Movielifez is a modern cinematic platform connecting talented actors with filmmakers, production houses, and casting directors globally.",
  keywords: ["casting agency", "actor registration", "hire actors", "film industry", "production house", "acting jobs", "casting calls", "Hyderabad film industry", "Movie lifez"],
  authors: [{ name: "Movielifez Team" }],
  creator: "Movielifez",
  publisher: "Movielifez",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Movielifez | Connecting Talent with Opportunity",
    description: "The premier platform for actors to showcase talent and filmmakers to find their perfect cast.",
    url: 'https://movielifez.com',
    siteName: 'Movielifez',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Movielifez Branding'
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Movielifez | Find Your Next Star',
    description: 'Connecting world-class filmmakers with top acting talent.',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "google-site-verification-placeholder",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Movielifez",
  "url": "https://movielifez.com",
  "logo": "https://movielifez.com/images/logo.png",
  "description": "Connecting talented actors with world-class filmmakers and production houses.",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-7799202129",
    "contactType": "customer service",
    "areaServed": "IN",
    "availableLanguage": ["en", "telugu", "hindi"]
  },
  "sameAs": [
    "https://www.facebook.com/share/1XALDgCPid/",
    "https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=m5jec1k",
    "https://youtube.com/@movielifez-o7e?si=2NOTNPk8r_5DTOnY"
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          <Navbar />
          <PageTransition>
            <main>{children}</main>
          </PageTransition>
          <Footer />
          <WhatsAppButton />
        </SmoothScroll>
      </body>
    </html>
  );
}
