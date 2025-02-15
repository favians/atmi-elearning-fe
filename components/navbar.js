import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
// import React from "react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";

import logoWhite from "@/assets/images/logo/logo_white.png";
import logo from "@/assets/images/logo/logo.png";
// import { ThemeSwitch } from "@/components/theme-switch";
import {
  GithubIcon,
  SearchIcon,
  ChevronDown,
  LogoWhite,
  Logo,
} from "@/components/icons";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import Image from "next/image";

export const Navbar = ({ isDark }) => {
  // const [isOpen, setIsOpen] = React.useState(false);
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: `${isDark ? "bg-default-100 " : "bg-transparent border-grey-800 border-1"}  w-3/4`,
        input: "text-sm w-full",
      }}
      radius="full"
      labelPlacement="outside"
      variant={isDark ? "flat" : "bordered"}
      placeholder="Cari kursus di sini"
      startContent={
        <SearchIcon
          className={
            "text-base text-grey-900  pointer-events-none mr-1 flex-shrink-0"
          }
        />
      }
      type="search"
    />
  );

  return (
    <NextUINavbar
      classNames={{
        base: [isDark ? "bg-dark-blue" : "bg-white"],
      }}
      maxWidth="xl"
      position="sticky"
    >
      <NavbarContent className="flex-1 basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 basis-full max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            {isDark ? (
              <Image
                src={logoWhite}
                alt="Logo White"
                height={40}
                className="mr-10 object-cover"
              />
            ) : (
              <Image
                src={logo}
                alt="Logo"
                height={40}
                className="mr-10 object-cover"
              />
            )}
          </NextLink>
        </NavbarBrand>
        <div className="hidden lg:flex gap-8 justify-start ml-2">
          <Dropdown
          // isOpen={isOpen}
          // onMouseLeave={() => {
          //   setIsOpen(false);
          // }}
          >
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  className={clsx(
                    isDark ? "text-white" : "text-black",
                    "p-0 h-auto bg-transparent antialiased  text-md data-[hover=true]:bg-transparent",
                  )}
                  radius="sm"
                  variant="light"
                  endContent={
                    <ChevronDown
                      fill={isDark ? "white" : "#8B95A5"}
                      size={14}
                    />
                  }
                  // onMouseEnter={() => {
                  //   setIsOpen(true);
                  // }}
                >
                  Kategori
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="Link Actions"
              className="w-[240px]"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownItem>
                <Link href={`/kategori/1`}>Kategori 1</Link>
              </DropdownItem>
              <DropdownItem>
                <Link href={`/kategori/2`}>Kategori 2</Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <NavbarItem>
            <NextLink
              className={clsx(
                linkStyles({ color: "foreground" }),
                isDark ? "text-white " : "text-black",
                " data-[active=true]:text-primary  data-[active=true]:font-medium",
              )}
              color="white"
              href={"/about"}
            >
              Tentang
            </NextLink>
          </NavbarItem>
        </div>

        <NavbarItem className="hidden w-full lg:flex ml-4">
          {searchInput}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent
        className="hidden !flex-grow-0 sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem key={"/login"}>
          <NextLink
            className={clsx(
              linkStyles({ color: "foreground" }),
              isDark ? "text-white " : "text-black",
              "border-r-1 px-4",
            )}
            href={"/login"}
          >
            Masuk
          </NextLink>
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            className={clsx(
              isDark ? "text-primary bg-default-100" : "",
              "text-sm font-normal ",
            )}
            size="sm"
            color="primary"
            href={siteConfig.links.sponsor}
            variant={isDark ? "flat" : "solid"}
          >
            Daftar
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        {/* <ThemeSwitch /> */}
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
