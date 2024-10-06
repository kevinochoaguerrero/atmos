import type { Metadata } from "next";
import { DM_Sans } from 'next/font/google';
import "./globals.css";

export const dm_sans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Atmos by Discovery",
  description: "Atmos it's cool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${dm_sans.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
