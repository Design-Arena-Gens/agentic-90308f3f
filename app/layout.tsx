import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AdGen - AI Ad Image Generator",
  description: "Create high-quality promotional images for Facebook & Instagram",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
