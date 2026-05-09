"use client";
import React from "react";
import { Sidebar } from "./sidebar.styles";
import { CompaniesDropdown } from "./companies-dropdown";

// import misc1 from "@/assets/icons/misc/misc1.png";
import Image from "next/image";
import { Menu } from "./menu";
import { Button } from "@heroui/button";
import { useSidebarContext } from "./layout-context";
import { MenuAdmin } from "./menu-admin";

export const SidebarWrapper = ({ isAdmin = false }) => {
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <>
      {collapsed && (
        <button
          aria-label="Tutup menu"
          className="fixed inset-0 top-16 z-[59] bg-slate-900/30 md:hidden"
          onClick={setCollapsed}
          type="button"
        />
      )}
      <aside
        className={`left-0 top-16 z-[60] w-72 border-r bg-white pt-5 transition-transform duration-200 max-[667px]:fixed max-[667px]:min-h-[calc(100vh-4rem)] ${
          collapsed ? "max-[667px]:translate-x-0" : "max-[667px]:-translate-x-full"
        } md:fixed md:top-0 md:z-auto md:block md:min-h-full md:translate-x-0`}
      >
        <div
          className={Sidebar({
            collapsed: collapsed,
          })}
        >
          <div className="mt-4 flex flex-1 flex-col justify-between md:mt-8">
            {isAdmin ? <MenuAdmin /> : <Menu />}
          </div>
          <div className={`${Sidebar.Footer()} max-[667px]:hidden`}>
            <div className="">v1.0.0</div>
          </div>
        </div>
        {/* <Image
          src={misc1}
          alt="Cristal Misc"
          width={120}
          className="absolute left-0 bottom-0"
        /> */}
      </aside>
    </>
  );
};
