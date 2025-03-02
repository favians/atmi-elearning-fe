"use client";
import React from "react";
import { SidebarContext } from "../components/shared/sidebar/layout-context";
import { NavbarWrapper } from "@/components/shared/navbar/navbar";
import { useLockedBody } from "@/hooks/useBodyLock";
import { SidebarWrapper } from "@/components/shared/sidebar/sidebar";

export const DashboardLayout = ({ children }) => {
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
      <section className="flex ">
        <SidebarWrapper />
        <NavbarWrapper>{children}</NavbarWrapper>
      </section>
    </SidebarContext.Provider>
  );
};
