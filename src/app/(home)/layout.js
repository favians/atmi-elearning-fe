"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import "swiper/css";
import "@/styles/globals.css";
import { fontSans, fontMono } from "@/config/fonts";
import { Head } from "@/layouts/head";
import Footer from "@/layouts/footer";
import { Providers } from "../provider";
export default function RootLayout({ children }) {
  return (
    <Providers>
      <main className="light text-foreground bg-background">
        <Head />
        <NextThemesProvider>{children}</NextThemesProvider>
        <Footer />
      </main>
    </Providers>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
