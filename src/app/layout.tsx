import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Naleka Beauty – Alongamento de Unhas em Gel",
  description: "Agende seu horário de alongamento de unhas em gel com a Naleka Beauty. Sofisticação, arte e atendimento exclusivo.",
  keywords: ["unhas em gel", "nail art", "alongamento unhas", "nail designer", "Naleka Beauty"],
  openGraph: {
    title: "Naleka Beauty – Alongamento de Unhas em Gel",
    description: "Arte que transforma cada detalhe. Experiência exclusiva para mulheres que valorizam o melhor.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
