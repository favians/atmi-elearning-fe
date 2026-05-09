import { HeroUIProvider } from "@heroui/system";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  maximumScale: 1,
  userScalable: false,
};

export default function Layout({ children }) {
  return (
    <html lang="en" data-theme="light" className="light">
      <body>
        <HeroUIProvider>{children} </HeroUIProvider>
      </body>
    </html>
  );
}
