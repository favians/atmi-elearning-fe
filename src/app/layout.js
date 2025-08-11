import "@/styles/globals.css";
export default function Layout({ children }) {
  return (
    <html lang="en" data-theme="light" className="light">
      <body>{children}</body>
    </html>
  );
}
