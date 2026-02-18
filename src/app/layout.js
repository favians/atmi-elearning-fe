import { HeroUIProvider } from "@heroui/system";

export default function Layout({ children }) {
  return (
    <html lang="en" data-theme="light" className="light">
      <body>
        <HeroUIProvider>{children} </HeroUIProvider>
      </body>
    </html>
  );
}
