import React from "react";
import { getTitleNavbar } from "./lib/navbarHelper";
import { usePathname, useRouter } from "next/navigation";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";

export const Breadcrumb = ({ links }) => {
  const router = useRouter();

  const pathName = usePathname();
  if (links?.length < 4) return;
  return (
    <div className="flex items-center">
      <Breadcrumbs
        separator="/"
        itemClasses={{
          separator: "px-2",
        }}
      >
        {links?.map((item, index) => {
          return (
            <BreadcrumbItem
              key={item}
              onPress={() => {
                router.push(
                  pathName.substring(0, pathName.indexOf(item) + item.length),
                );
              }}
            >
              {getTitleNavbar(item).toLowerCase()}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};
