import type { Metadata, Viewport } from "next";
import { Inter, Sofia_Sans_Extra_Condensed } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

// Fontes do Figma (variáveis tipografia/texto e tipografia/titulos).
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const sofia = Sofia_Sans_Extra_Condensed({ subsets: ["latin"], weight: ["700", "800", "900"], variable: "--font-sofia", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Painel Miniverso",
    template: "%s | Painel Miniverso",
  },
  description: "Painel administrativo do portfólio institucional da Miniverso.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#05060a",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${sofia.variable}`}>
      <body>{children}</body>
    </html>
  );
}
