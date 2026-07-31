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
  title: {
    default: META.title,
    template: "%s | GenieHive",
  },
  description: META.description,
  applicationName: "GenieHive",
  keywords: [...META.keywords],
  authors: [{ name: "Genie Hive Private Limited", url: META.url }],
  creator: "Genie Hive Private Limited",
  publisher: "Genie Hive Private Limited",
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    title: META.title,
    description: META.description,
    siteName: META.siteName,
    url: META.url,
    type: "website",
    locale: "en_IN",
    images: [
      { url: "/mascot/genie-mascot-home.png", width: 480, height: 480, alt: "GenieHive — The Vertical AI Creator Studio" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: META.title,
    description: META.description,
    images: ["/mascot/genie-mascot-home.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  other: {
    "geo.region": "IN",
    "geo.placename": "India",
  },
};

// Structured data for search engines and AI answer engines (GEO).
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${META.url}/#organization`,
      name: "Genie Hive Private Limited",
      alternateName: "GenieHive",
      url: META.url,
      logo: `${META.url}/icon.png`,
      description: META.description,
      areaServed: { "@type": "Country", name: "India" },
    },
    {
      "@type": "WebSite",
      "@id": `${META.url}/#website`,
      url: META.url,
      name: "GenieHive",
      publisher: { "@id": `${META.url}/#organization` },
      inLanguage: "en-IN",
    },
    {
      "@type": "SoftwareApplication",
      name: "GenieHive — The Vertical AI Creator Studio",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Web",
      description: META.description,
      url: META.url,
      inLanguage: ["Hindi", "Tamil", "Telugu", "Marathi", "Kannada", "Bengali", "Gujarati", "Punjabi", "English"],
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      publisher: { "@id": `${META.url}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body
        className={`${sora.variable} ${inter.variable} ${jetbrains.variable} font-body antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
