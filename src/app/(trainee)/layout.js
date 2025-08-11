"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { fontSans, fontMono } from "@/config/fonts";
import { Providers } from "../provider";
import "swiper/css";
export default function RootLayout({ children }) {
  return (
    <Providers>
      <main className="light text-foreground bg-background">
        <NextThemesProvider>{children}</NextThemesProvider>
      </main>
    </Providers>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
