import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { CookieConsent } from "@/components/sirax/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sirax · Identity & Risk Intelligence Platform",
  description:
    "Plataforma de Verificación de Identidad, Background Checks, Compliance e Inteligencia de Riesgo para México y Latinoamérica. Powered by SynkData.",
  keywords: [
    "Sirax",
    "SynkData",
    "KYC",
    "Identity Intelligence",
    "Risk Intelligence",
    "Compliance",
    "CURP",
    "RFC",
    "RENAPO",
    "SAT",
    "OFAC",
    "Background Checks",
    "México",
    "Latinoamérica",
  ],
  authors: [{ name: "Sirax — SynkData" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Sirax · Identity & Risk Intelligence Platform",
    description:
      "Verificación de Identidad + Inteligencia Gubernamental + Compliance Screening + Análisis de Huella Digital + Inteligencia Relacional + Evaluación de Riesgo con IA.",
    siteName: "Sirax",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sirax · Identity & Risk Intelligence Platform",
    description:
      "Plataforma de Verificación de Identidad y Riesgo para México y Latinoamérica.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <CookieConsent />
        <Toaster />
      </body>
    </html>
  );
}
