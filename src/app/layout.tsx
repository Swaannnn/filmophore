import React from "react"
import type { Metadata } from "next"

import Header from '@/components/Header'
import "./globals.css"

export const metadata: Metadata = {
  title: "FilmoPhore",
  description: "...",
}

export default function RootLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="fr">
          <body className="bg-black text-white-primary">
          <Header />
              <div className="relative h-[100vh-4rem] bg-fixed bg-cover bg-center bg-[url('/assets/background.jpg')]">
                  <div className="relative min-h-[calc(100vh-4rem)] bg-fixed inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-100">
                      <main>{children}</main>
                  </div>
              </div>
          </body>
      </html>
  )
}
