import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Painel Miniverso",
    template: "%s | Painel Miniverso",
  },
  description: "Painel administrativo do portfólio institucional da Miniverso.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#1e1645",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
