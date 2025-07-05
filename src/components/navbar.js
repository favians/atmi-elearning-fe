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
import { useGetCategoryNavbar } from "@/hooks/home/useGetCategoryNavbar";
import { useTopic } from "@/context/topic-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchTraining } from "@/hooks/home/useSearchTraining";
import { Spinner } from "@heroui/spinner";

export const Navbar = ({ isDark }) => {
  // const [isOpen, setIsOpen] = React.useState(false);
  const { data } = useGetCategoryNavbar();
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [isSearching, setIsSearching] = useState(false);
  const skipQuery = debouncedSearch.trim() === "";
  const { data: dataSearch, isLoading: isSearchLoading } = useSearchTraining({
    params: {
      limit: 10,
      name_search: debouncedSearch || "",
    },
    enabled: !skipQuery,
  });

  console.log("dataSearch", dataSearch);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchValue);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchValue]);

  // Optional: lakukan pencarian
  useEffect(() => {
    if (debouncedSearch) {
      console.log("Searching for:", debouncedSearch);
      // fetchData(debouncedSearch); // atau setFilter, dll
    }
  }, [debouncedSearch]);

  const router = useRouter();
  const { _, setSelectedTopicId } = useTopic();
  const [selectedDropdown, setSelectedDropdown] = useState(null);
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
      onChange={(e) => {
        setIsSearching(true);
        setSearchValue(e.target.value);
      }}
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
                  <div className="w-full px-4 py-2 text-left  cursor-pointer">
                    {category?.title}
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

        <NavbarItem className="hidden relative w-full lg:flex ml-4">
          {searchInput}

          {isSearching && (
            <div
              onMouseLeave={() => {
                setIsSearching(false);
              }}
              className="absolute left-0 top-10  group-hover:block bg-white  z-10 min-w-full"
            >
              <ul className="text-sm text-gray-700">
                {isSearchLoading ? (
                  <div className="p-4">
                    <Spinner />
                  </div>
                ) : (
                  dataSearch?.map((item) => (
                    <li
                      key={item?.id}
                      className="px-4 py-2 hover:bg-green-100 cursor-pointer"
                      onClick={() => {
                        router.push(`/topic/${item?.id}`);
                      }}
                    >
                      {item?.title}
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
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
