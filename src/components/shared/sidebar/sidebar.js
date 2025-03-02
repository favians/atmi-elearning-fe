"use client";
import React from "react";
import { Sidebar } from "./sidebar.styles";
import { CompaniesDropdown } from "./companies-dropdown";

// import misc1 from "@/assets/icons/misc/misc1.png";
import Image from "next/image";
import { Menu } from "./menu";
import { Button } from "@heroui/button";
import { useSidebarContext } from "./layout-context";

export const SidebarWrapper = () => {
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen w-200 fixed border-r-1">
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className="flex flex-1 mt-8 flex-col justify-between ">
          <Menu />
        </div>
        <div className={Sidebar.Footer()}>
          <div className="">v1.0.0</div>
        </div>
        {/* <Image
          src={misc1}
          alt="Cristal Misc"
          width={120}
          className="absolute left-0 bottom-0"
        /> */}
      </div>
    </aside>
  );
};
