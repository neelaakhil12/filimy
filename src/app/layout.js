import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import SmoothScroll from "@/components/Transitions/SmoothScroll";
import PageTransition from "@/components/Transitions/PageTransition";
import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";

export const metadata = {
  title: "Movielifez | Find the Perfect Actors for Your Next Project",
  description: "Create a modern cinematic platform that connects actors with filmmakers, production houses, and project managers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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
