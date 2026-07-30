import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import { META } from "@/content/copy";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-sora",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL(META.url),
  title: META.title,
  description: META.description,
  openGraph: {
    title: META.title,
    description: META.description,
    siteName: META.siteName,
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sora.variable} ${inter.variable} ${jetbrains.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
