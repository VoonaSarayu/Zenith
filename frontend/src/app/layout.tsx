import type { Metadata } from "next";
import { Playfair_Display, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroller from "../components/SmoothScroller";

const playfairDisplay = Playfair_Display({
  variable: "--font-serif-next",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const qurova = localFont({
  src: "./fonts/Qurova-Bold.otf",
  variable: "--font-qurova-next",
});

const outfit = Outfit({
  variable: "--font-display-next",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans-next",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Zenith — Weekly Wellness Dashboard",
  description: "A premium weekly wellness dashboard prototyping feature for the Samsung Health ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${outfit.variable} ${plusJakartaSans.variable} ${qurova.variable}`}>
      <body>
        <SmoothScroller>
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}
