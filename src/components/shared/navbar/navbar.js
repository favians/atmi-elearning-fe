"use client";
import React from "react";
import { NotificationsDropdown } from "./notifications-dropdown";
import { UserDropdown } from "./user-dropdown";
import { Breadcrumb } from "./breadcrumb";
import { useParams, usePathname } from "next/navigation";
import { getTitleNavbar } from "./lib/navbarHelper";
import { toCapitalizeEachWord } from "@/helpers/Text";
import { Navbar, NavbarContent } from "@heroui/navbar";

export const NavbarWrapper = ({ children }) => {
  const paths = usePathname();
  const links = paths?.split("/");

  const params = useParams();
  return (
    <div className="relative  gap-4 flex ml-[288px] min-h-screen bg-gray-100 flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Navbar
        className="w-full  bg-white m-18"
        classNames={{
          wrapper: ["w-full max-w-full"],
        }}
      >
        <NavbarContent className="w-full max-md:hidden"></NavbarContent>
        <NavbarContent
          justify="end"
          className="w-fit data-[justify=end]:flex-grow-0"
        >
          <NotificationsDropdown />

          <NavbarContent>
            {" "}
            <UserDropdown />{" "}
          </NavbarContent>
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};
