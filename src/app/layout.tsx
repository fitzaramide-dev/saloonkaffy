import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kaffy Saloon | Glamour Penthouse Hair Studio in Santa Venera, Malta',
  description: "Malta's boutique pink penthouse hair studio specializing in knotless braids, Ghana weaving, box braids, weaves, and gentle kids hair.",
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    apple: [
      { url: '/icon.svg' },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${playfair.variable} ${jakarta.variable} scroll-smooth`}>
        <body className="bg-glam-page text-glam-plum font-sans antialiased selection:bg-glam-pink selection:text-white overflow-x-hidden">
          {/* Google Analytics (GA4) */}
          <Script
            strategy="afterInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=G-56DC80JTCC"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
          >
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-56DC80JTCC', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
