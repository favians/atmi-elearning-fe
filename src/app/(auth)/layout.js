"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";
import { Head } from "@/layouts/head";
import "swiper/css";
import { Providers } from "../provider";
export default function RootLayout({ children }) {
  return (
    <Providers>
      <main className="light text-foreground bg-background">
        <Head />
        <NextThemesProvider>{children}</NextThemesProvider>
      </main>
    </Providers>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
