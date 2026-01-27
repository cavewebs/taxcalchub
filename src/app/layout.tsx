import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TaxCalBase – Free Financial Calculators",
    template: "%s | TaxCalBase",
  },
  description:
    "Free online financial calculators for salary, tax, VAT, sales tax, and freelance rates. Calculate your take-home pay, tax obligations, and freelance earnings instantly.",
  metadataBase: new URL("https://taxcalbase.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "TaxCalBase",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
