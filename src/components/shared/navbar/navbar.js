"use client";
import React from "react";
import { NotificationsDropdown } from "./notifications-dropdown";
import { UserDropdown } from "./user-dropdown";
import { Breadcrumb } from "./breadcrumb";
import { useParams, usePathname } from "next/navigation";
import { getTitleNavbar } from "./lib/navbarHelper";
import { toCapitalizeEachWord } from "@/helpers/Text";
import { Navbar, NavbarContent } from "@heroui/navbar";
import { Button } from "@heroui/button";
import { CompaniesDropdown } from "../sidebar/companies-dropdown";
import { useSidebarContext } from "../sidebar/layout-context";

export const NavbarWrapper = ({ children }) => {
  const paths = usePathname();
  const links = paths?.split("/");

  const params = useParams();
  const { collapsed, setCollapsed } = useSidebarContext();
  return (
    <div>
      <Navbar
        className="fixed w-full border-b-1 bg-white m-18"
        classNames={{
          wrapper: ["w-full max-w-full px-4 md:px-6"],
        }}
      >
        <NavbarContent className="w-fit flex-none md:hidden" justify="start">
          <Button
            isIconOnly
            variant="light"
            className="min-w-0 text-[#003452]"
            onPress={setCollapsed}
          >
            <div className="flex h-5 w-6 flex-col justify-center gap-1">
              <span
                className={`block h-0.5 w-6 rounded-full bg-[#003452] transition-transform duration-200 ${
                  collapsed ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 rounded-full bg-[#003452] transition-opacity duration-200 ${
                  collapsed ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 rounded-full bg-[#003452] transition-transform duration-200 ${
                  collapsed ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </div>
          </Button>
        </NavbarContent>
        <NavbarContent className="w-full max-md:hidden">
          <CompaniesDropdown />
        </NavbarContent>
        <NavbarContent
          justify="end"
          className="ml-auto w-fit flex-none gap-0 data-[justify=end]:flex-grow-0"
        >
          {/* <NotificationsDropdown /> */}

          <UserDropdown />
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};
