import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Point of Dev Hotel & Resort | A New Standard of Luxury",
  description: "Point of Dev Hotel — an architectural sanctuary where luxury meets nature. Private suites, Michelin dining, and bespoke experiences in Silicon Valley.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
