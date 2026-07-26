import type { Metadata } from "next";
import { Geist, Prata } from "next/font/google";

import { AppFluentProvider } from "@/components/providers/app-fluent-provider";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const prata = Prata({
  variable: "--font-prata",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Portafolio",
    template: "%s · Portafolio",
  },
  description: "Portafolio personal de proyectos de diseño UX/UI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${prata.variable}`} suppressHydrationWarning>
      <body>
        <AppFluentProvider>{children}</AppFluentProvider>
      </body>
    </html>
  );
}
