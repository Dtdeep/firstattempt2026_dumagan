// KEY FILE: Root app shell; wires global metadata + service worker registrar.
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ServiceWorkerRegistrar from "./ServiceWorkerRegistrar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Career Passport",
  description: "Access your professional network and career tools.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/career-passport-icon.svg", type: "image/svg+xml" },
      { url: "/globe.svg", type: "image/svg+xml" },
    ],
    shortcut: [{ url: "/icons/career-passport-icon.svg" }],
    apple: [{ url: "/icons/career-passport-icon.svg" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#003d82",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ServiceWorkerRegistrar />
        {children}
      </body>
    </html>
  );
}
