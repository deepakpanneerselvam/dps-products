import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ComparisonProvider } from "@/context/comparison-context";
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
  title: "SmartIndianBazaar - Best Deals on Electronics & Home Appliances",
  description: "Discover the best deals on electronics, home appliances, mobiles, laptops, and more at SmartIndianBazaar. Compare prices, read reviews, and find the perfect products for your needs.",
  keywords: "electronics, home appliances, mobiles, laptops, deals, India",
  openGraph: {
    title: "SmartIndianBazaar - Best Deals on Electronics & Home Appliances",
    description: "Discover the best deals on electronics, home appliances, mobiles, laptops, and more",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-background`}
    >
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxxxxxxxx"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <ComparisonProvider>
          {children}
        </ComparisonProvider>
      </body>
    </html>
  );
}
