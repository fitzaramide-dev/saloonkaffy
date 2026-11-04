import type { Metadata } from 'next';
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${playfair.variable} ${jakarta.variable} scroll-smooth`}>
        <body className="bg-glam-page text-glam-plum font-sans antialiased selection:bg-glam-pink selection:text-white">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
