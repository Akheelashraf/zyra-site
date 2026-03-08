import type { Metadata } from "next";
import "@/styles/globals.css";

const siteTitle = "Zyra Builds – Structured Commercial Fit-Outs";
const siteDescription =
  "Zyra Builds delivers organized, high-quality commercial interiors for restaurants, offices, and business spaces across Saudi Arabia. Structured Commercial Fit-Outs for Growing Businesses.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
