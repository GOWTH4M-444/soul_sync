import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-cormorant" });

export const metadata: Metadata = {
  title: "SoulSync — Holistic AI Health Companion",
  description:
    "An AI-powered platform that heals your soul, mind, and body. Get personalized guidance for spiritual, mental, and physical wellness.",
  keywords: "holistic health, AI health companion, mental wellness, spiritual healing, physical health",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${cormorant.variable}`}>
      <body className="antialiased font-sans">
        <div className="grain" aria-hidden="true" />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
