import type { Metadata } from "next";
import { Manrope, Libre_Baskerville, Space_Grotesk } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-editorial",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hustly: a plataforma que entende seu jeito de aprender",
  description:
    "Hustly é a plataforma com IA que entende, organiza e acelera sua vida acadêmica. Exclusiva para alunos Ânima. Comece do seu nível, evolua no seu ritmo.",
  alternates: {
    canonical: "https://hustly.me",
  },
  openGraph: {
    title: "Hustly: a plataforma que entende seu jeito de aprender",
    description:
      "Hustly é a plataforma com IA que entende, organiza e acelera sua vida acadêmica. Exclusiva para alunos Ânima.",
    type: "website",
    url: "https://hustly.me",
    siteName: "Hustly",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hustly: a plataforma que entende seu jeito de aprender",
    description:
      "Hustly é a plataforma com IA que entende, organiza e acelera sua vida acadêmica. Exclusiva para alunos Ânima.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${libreBaskerville.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}