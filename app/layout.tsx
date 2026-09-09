import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Great_Vibes, IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import { BASE_PATH } from "@/lib/base-path";
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

export const metadata: Metadata = {
  title: "Home of Creativity — Brand Architects",
  description:
    "Home of Creativity (Creativation Source) — brand architects. Premium Minimalism and human-centric marketing in Syria and Saudi Arabia.",
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
      lang="en"
      dir="ltr"
      className={`${inter.variable} ${ibmPlexArabic.variable} ${greatVibes.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <Script
          id="hoc-locale-boot"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k="hoc-locale";var l=null;try{l=localStorage.getItem(k);}catch(e){}if(l!=="ar"&&l!=="en"){var m=document.cookie.match(/(?:^|; )hoc-locale=(ar|en)/);l=m?m[1]:"en";}var h=document.documentElement;h.lang=l==="ar"?"ar":"en";h.dir=l==="ar"?"rtl":"ltr";h.setAttribute("data-locale",l==="ar"?"ar":"en");if(l==="ar"){h.setAttribute("data-i18n-pending","1");var s=document.createElement("style");s.setAttribute("data-hoc-i18n","1");s.textContent='html[data-i18n-pending="1"]:not([data-i18n-ready]) body{visibility:hidden}';(document.head||h).appendChild(s);}if("serviceWorker"in navigator){navigator.serviceWorker.register("/home-of-creativity-profile/sw.js",{scope:"/home-of-creativity-profile/"}).catch(function(){});}}catch(e){}setTimeout(function(){var h=document.documentElement;h.removeAttribute("data-i18n-pending");h.setAttribute("data-i18n-ready","1");},4000);})();`,
          }}
        />
        <div suppressHydrationWarning aria-hidden />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
