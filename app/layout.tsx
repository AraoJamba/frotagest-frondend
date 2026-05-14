import React from "react";

import type { Metadata } from "next";

import { Analytics } from "@vercel/analytics/next";

import { Inter } from "next/font/google";

import Providers from "./providers";

import "@/app/globals.css";

// FONT
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// METADATA
export const metadata: Metadata = {
  title: "FrotaGest | Sistema de Gestão de Frotas",
  description:
    "Plataforma moderna para gerenciamento e monitoramento de frotas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="pt-AO">

      <body
        className={`
          ${inter.variable}
          font-sans
          antialiased
          bg-slate-100
          text-slate-800
        `}
      >

        <Providers>
          {children}
        </Providers>

        <Analytics />
      </body>
    </html>
  );
}