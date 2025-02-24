import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";

import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";
import "swiper/css";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <main className="light text-foreground bg-background">
        <NextThemesProvider>
          <Component {...pageProps} />
        </NextThemesProvider>
      </main>
    </HeroUIProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
