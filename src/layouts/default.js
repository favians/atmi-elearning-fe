import { Navbar } from "@/components/navbar";
import Breadcrumb from "@/components/breadcrumb";

export default function DefaultLayout({ isDark, children }) {
  return (
    <div>
      <Navbar isDark={isDark} />
      <Breadcrumb />
      <main>{children}</main>
    </div>
  );
}
