"use client";
import { Link } from "@heroui/link";
import { subtitle } from "./primitives";
import Section from "@/layouts/section";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const paths = usePathname();
  const links = paths?.split("/");
  const pathName = usePathname();
  if (pathName == "/") return;
  return (
    <div className="bg-dark-blue p-2">
      <Section wrapperClass={"flex items-center gap-2"}>
        <Link href={"/"}>
          <h4 className={subtitle({ color: "white", size: "sm" })}>Home</h4>
        </Link>
        {links.map((item) => {
          if (item == "") return;
          return (
            <div key={item} className="flex items-center gap-2">
              <h4 className={subtitle({ color: "white", size: "sm" })}>/</h4>
              <h4 className={subtitle({ color: "white", size: "sm" })}>
                {item}
              </h4>
            </div>
          );
        })}
      </Section>
    </div>
  );
}
