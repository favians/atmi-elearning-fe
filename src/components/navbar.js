"use client";
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
import { Input } from "@heroui/input";
import NextLink from "next/link";
import clsx from "clsx";

import logoWhite from "@/assets/images/logo/logo_white.png";
import logo from "@/assets/images/logo/logo.png";
// import { ThemeSwitch } from "@/components/theme-switch";
import { SearchIcon, ChevronDown } from "@/components/icons";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import Image from "next/image";
import { useGetCategoryNavbar } from "@/hooks/home/useGetCategoryNavbar";
import { useTopic } from "@/context/topic-context";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GoChevronRight } from "react-icons/go";

export const Navbar = ({ isDark }) => {
  // const [isOpen, setIsOpen] = React.useState(false);
  const { data } = useGetCategoryNavbar();
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setSelectedTopicId } = useTopic();
  const [selectedDropdown, setSelectedDropdown] = useState(null);

  useEffect(() => {
    setSearchValue(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = searchValue.trim();

    if (!query) return;

    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        base: "w-full max-[667px]:w-full",
        inputWrapper: `${isDark ? "bg-default-100 " : "bg-transparent border-grey-800 border-1"} w-3/4 max-[667px]:w-full`,
        input: "text-sm w-full",
      }}
      radius="full"
      labelPlacement="outside"
      variant={isDark ? "flat" : "bordered"}
      placeholder="Cari kursus di sini"
      onChange={(e) => setSearchValue(e.target.value)}
      value={searchValue}
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
        menu: [isDark ? "bg-dark-blue" : "bg-[#003452]"],
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
            classNames={{ content: "p-0" }}
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
                  onClick={() => {
                    setSelectedDropdown(null);
                  }}
                >
                  Kategori
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="Link Actions"
              color="primary"
              classNames={{
                base: "w-[240px] p-0 gap-4   overflow-visible bg-white text-black",
              }}
              itemClasses={{
                base: "static data-[hover=true]:bg-green-100 data-[hover=true]:text-black data-[hover=true]:rounded-none",
              }}
            >
              {data?.map((category) => (
                <DropdownItem
                  itemClasses={{
                    content: "p-0",
                  }}
                  onFocus={() => {
                    setSelectedDropdown(category.id);
                  }}
                  onPress={() => {
                    setSelectedTopicId(category.id);
                    const el = document.getElementById("topics");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  key={category.id}
                  className=" group p-0 overflow-visible"
                >
                  <div className="w-full px-4 flex items-center py-2 text-left  cursor-pointer">
                    <span className="flex flex-1 ">{category?.title}</span>
                    <GoChevronRight className="w-4 h-4 text-muted-foreground " />
                  </div>

                  {/* Submenu - appears on hover */}
                  {selectedDropdown === category.id &&
                    category?.trainings.length > 0 && (
                      <div className="absolute left-full top-0  group-hover:block bg-white border shadow-lg z-10 min-w-[280px]">
                        <ul className="text-sm text-gray-700">
                          {category?.trainings?.map((topic) => (
                            <li
                              key={topic?.id}
                              className="px-4 py-2 hover:bg-green-100 cursor-pointer"
                              onClick={() => {
                                router.push(`/topic/${topic?.id}`);
                              }}
                            >
                              {topic?.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          <NavbarItem>
            <NextLink
              className={clsx(
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

        <NavbarItem className="hidden relative w-full lg:flex ml-4">
          <form className="w-full" onSubmit={handleSearchSubmit}>
            {searchInput}
          </form>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent
        className="hidden !flex-grow-0 sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem key={"/login"}>
          <NextLink
            className={clsx(
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
            className={clsx(
              isDark ? "text-primary bg-default-100" : "",
              "text-sm font-normal ",
            )}
            size="sm"
            color="primary"
            variant={isDark ? "flat" : "solid"}
            onPress={() =>
              window.open("https://forms.gle/q43rtuwZqPn2TXjg7", "_blank")
            }
          >
            Daftar
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle
          className="text-white"
          icon={(isOpen) => (
            <div className="flex h-5 w-6 flex-col justify-center gap-1">
              <span
                className={clsx(
                  "block h-0.5 w-6 rounded-full bg-white transition-transform duration-200",
                  isOpen && "translate-y-1.5 rotate-45",
                )}
              />
              <span
                className={clsx(
                  "block h-0.5 w-6 rounded-full bg-white transition-opacity duration-200",
                  isOpen && "opacity-0",
                )}
              />
              <span
                className={clsx(
                  "block h-0.5 w-6 rounded-full bg-white transition-transform duration-200",
                  isOpen && "-translate-y-1.5 -rotate-45",
                )}
              />
            </div>
          )}
        />
      </NavbarContent>

      <NavbarMenu>
        <div className="px-4 pt-4 pb-6 flex flex-col gap-4">
          <form className="w-full" onSubmit={handleSearchSubmit}>
            {searchInput}
          </form>
          <div className="flex flex-col gap-2">
            <NavbarMenuItem>
              <NextLink
                className={clsx(
                  isDark ? "text-white" : "text-black",
                  "text-base font-medium",
                )}
                href="/"
              >
                Beranda
              </NextLink>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <NextLink
                className={clsx(
                  isDark ? "text-white" : "text-black",
                  "text-base font-medium",
                )}
                href="/about"
              >
                Tentang
              </NextLink>
            </NavbarMenuItem>
            {data?.map((category) => (
              <NavbarMenuItem key={category.id}>
                <button
                  className={clsx(
                    isDark ? "text-white" : "text-black",
                    "text-left text-base font-medium w-full",
                  )}
                  onClick={() => {
                    setSelectedTopicId(category.id);
                    router.push("/#topics");
                  }}
                  type="button"
                >
                  {category.title}
                </button>
              </NavbarMenuItem>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-3 border-t border-white/10">
            <NextLink
              className={clsx(
                isDark ? "text-white" : "text-black",
                "text-base font-medium",
              )}
              href="/login"
            >
              Masuk
            </NextLink>
            <Button
              className={clsx(
                isDark ? "text-primary bg-default-100" : "",
                "w-full text-sm font-normal",
              )}
              color="primary"
              variant={isDark ? "flat" : "solid"}
              onPress={() =>
                window.open("https://forms.gle/q43rtuwZqPn2TXjg7", "_blank")
              }
            >
              Daftar
            </Button>
          </div>
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
