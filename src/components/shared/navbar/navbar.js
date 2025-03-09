"use client";
import React from "react";
import { NotificationsDropdown } from "./notifications-dropdown";
import { UserDropdown } from "./user-dropdown";
import { Breadcrumb } from "./breadcrumb";
import { useParams, usePathname } from "next/navigation";
import { getTitleNavbar } from "./lib/navbarHelper";
import { toCapitalizeEachWord } from "@/helpers/Text";
import { Navbar, NavbarContent } from "@heroui/navbar";
import { CompaniesDropdown } from "../sidebar/companies-dropdown";

export const NavbarWrapper = ({ children }) => {
  const paths = usePathname();
  const links = paths?.split("/");

  const params = useParams();
  return (
    <div>
      <Navbar
        className="w-full border-b-1  fixed bg-white m-18"
        classNames={{
          wrapper: ["w-full max-w-full"],
        }}
      >
        <NavbarContent className="w-full max-md:hidden">
          <CompaniesDropdown />
        </NavbarContent>
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
