import { Suspense } from "react";
import { Navbar } from "@/components/navbar";
import Breadcrumb from "@/components/breadcrumb";

export default function DefaultLayout({ isDark, children }) {
  return (
    <div>
      <Suspense fallback={null}>
        <Navbar isDark={isDark} />
      </Suspense>
      {/* <Breadcrumb /> */}
      <main>{children}</main>
    </div>
  );
}
