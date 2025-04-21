"use client";

import ReactQueryProvider from "@/config/react-query.provider";
import { HeroUIProvider } from "@heroui/system";
import { Toaster } from "react-hot-toast";

export function Providers({ children }) {
  return (
    <HeroUIProvider>
      <Toaster />
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </HeroUIProvider>
  );
}
