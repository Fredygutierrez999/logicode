import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Dominio público del sitio. WhatsApp y las redes sociales necesitan URLs
// absolutas para la imagen de vista previa. Defínelo en el hosting (SITE_URL)
// antes de compilar, p. ej. https://www.logicode.com
const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";

const title = "Logi Code — Software a la medida e IA para tu negocio";
const description =
  "Convertimos los objetivos de tu negocio en software: aplicaciones web, móviles y de escritorio, automatización y agentes de IA. Solicita tu diagnóstico de IA sin costo.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_LA",
    url: "/",
    siteName: "Logi Code",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
