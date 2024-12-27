import { Head } from "./head";

import { Navbar } from "@/components/navbar";
import Footer from "./footer";
import Breadcrumb from "@/components/breadcrumb";

export default function DefaultLayout({ isDark, children }) {
  return (
    <div>
      <Head />
      <Navbar isDark={isDark} />
      <Breadcrumb />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
