import React from "react";
import type { Metadata } from "next";

import { Inter } from "next/font/google";
import Header from '@/components/Header/Header'
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FilmoPhore",
  description: "...",
};

export default function RootLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main className={inter.className}>{children}</main>
        {/*<Footer />*/}
      </body>
    </html>
  );
}
