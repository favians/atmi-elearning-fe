"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";
import { Providers } from "../provider";
import "swiper/css";
import { AdminLayout } from "@/layouts/admin-layout";
export default function RootLayout({ children }) {
  return (
    <Providers>
      <main className="light text-foreground bg-background">
        <NextThemesProvider>
          <AdminLayout>{children}</AdminLayout>
        </NextThemesProvider>
      </main>
    </Providers>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
