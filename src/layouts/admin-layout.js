"use client";
import React from "react";
import { SidebarContext } from "../components/shared/sidebar/layout-context";
import { NavbarWrapper } from "@/components/shared/navbar/navbar";
import { useLockedBody } from "@/hooks/useBodyLock";
import { SidebarWrapper } from "@/components/shared/sidebar/sidebar";

export const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [_, setLocked] = useLockedBody(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };

  return (
    <SidebarContext.Provider
      value={{
        collapsed: sidebarOpen,
        setCollapsed: handleToggleSidebar,
      }}
    >
      <section>
        <NavbarWrapper></NavbarWrapper>

        <div className="relative flex min-h-screen bg-gray-100  overflow-y-auto overflow-x-hidden">
          <SidebarWrapper isAdmin />
          <div className="flex ml-[288px] mt-16 flex-col flex-1">
            {children}
          </div>
        </div>
      </section>
    </SidebarContext.Provider>
  );
};
