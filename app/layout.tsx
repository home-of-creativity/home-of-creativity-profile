import type { Metadata, Viewport } from "next";
import { Great_Vibes, IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { BASE_PATH } from "@/lib/base-path";
import { LOCALE_BOOT_SCRIPT } from "@/lib/locale-boot";
import { THEME_BOOT_SCRIPT } from "@/lib/theme-boot";
import { officesGeo } from "@/lib/seo";
import { GOOGLE_SITE_VERIFICATION, OG_IMAGE_PATH, SITE_NAME, SITE_NAME_AR, SITE_SHORT, SITE_URL, pageDescription, seoCopy } from "@/lib/site";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-arabic",
  display: "swap",
  adjustFontFallback: true,
  fallback: ["Geeza Pro", "Tahoma", "Arial", "sans-serif"],
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
});

const homeTitle = `${SITE_NAME_AR} | Home | ${SITE_SHORT} — وكالة هوية دمشق`;
const homeDescription = pageDescription(seoCopy.homeDescription.en, seoCopy.homeDescription.ar);

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: {
    default: homeTitle,
    template: `%s — ${SITE_NAME} | ${SITE_NAME_AR}`,
  },
  description: homeDescription,
  applicationName: "Home of Creativity",
  authors: [{ name: "Home of Creativity" }],
  creator: "Home of Creativity",
  publisher: "Home of Creativity",
  category: "marketing",
  keywords: [
    "hoc",
    "Hoc",
    "HOC",
    "hoc.agency",
    "Home",
    "Home of Creativity",
    "بيت",
    "الابداع",
    "الإبداع",
    "بيت الإبداع",
    "بيت الابداع",
    "وكالة هوية بصرية دمشق",
    "تصميم هوية تجارية الرياض",
  ],
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ar_AR",
    alternateLocale: ["en_US"],
    url: "/",
    siteName: SITE_NAME,
    title: homeTitle,
    description: homeDescription,
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1920,
        height: 1080,
        alt: "Home of Creativity — brand architects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: [OG_IMAGE_PATH],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...(GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
  other: {
    "geo.region": officesGeo.syr.region,
    "geo.placename": "Damascus, Al Hamra",
    "geo.position": `${officesGeo.syr.latitude};${officesGeo.syr.longitude}`,
    ICBM: `${officesGeo.syr.latitude}, ${officesGeo.syr.longitude}`,
  },
  icons: {
    icon: [{ url: `${BASE_PATH}/hummingbird.svg`, type: "image/svg+xml" }],
    shortcut: `${BASE_PATH}/hummingbird.svg`,
    apple: `${BASE_PATH}/hummingbird.svg`,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${inter.variable} ${ibmPlexArabic.variable} ${greatVibes.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: LOCALE_BOOT_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      </head>
      <body suppressHydrationWarning>
        <SeoJsonLd />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
