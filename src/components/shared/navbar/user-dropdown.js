import React from "react";
import { GoChevronDown } from "react-icons/go";

import logout from "@/assets/icons/general/sign-out.png";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { NavbarItem } from "@heroui/navbar";
import { Avatar } from "@heroui/avatar";
import { subteks } from "@/components/primitives";
import { deleteCookie } from "cookies-next";
import { useQueryClient } from "@tanstack/react-query";
import { storageKeys } from "@/constants/storage-keys";

export const UserDropdown = () => {
  const router = useRouter();
  const pathName = usePathname();

  const queryClient = useQueryClient();

  const useLogout = () => {
    deleteCookie(storageKeys.AUTH_TOKEN);
    deleteCookie(storageKeys.ROLE);
    queryClient.clear();
    router.push("/");
  };
  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger className="mb-1">
          <div className="flex items-center gap-2 cursor-pointer">
            <Avatar
              as="button"
              color="secondary"
              size="sm"
              className="w-7 h-7"
              src={
                "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg"
              }
            />
            <div>
              <div className="font-normal text-sm">Dhian Jois</div>
              <h4
                className={subteks({
                  class: "font-normal",
                  color: "grey",
                  size: "sm",
                })}
              >
                +6283834493999
              </h4>
            </div>

            <GoChevronDown />
          </div>
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <DropdownItem
          isDisabled={true}
          key="profile"
          className="flex flex-col justify-start w-full items-start"
        >
          <p>PROFILE</p>
        </DropdownItem>

        <DropdownItem
          key="settings"
          onClick={() => router.push("/dashboard/profile")}
        >
          <div className="flex items-center gap-2">
            <div className="w-6 justify-center flex">
              <Avatar
                as="button"
                color="secondary"
                size="sm"
                className="w-5 h-5"
                src={
                  "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg"
                }
              />
            </div>
            Detail Profil
          </div>
        </DropdownItem>

        <DropdownItem
          onClick={() => useLogout()}
          key="logout"
          color="danger"
          className="text-danger "
        >
          <div className="flex items-center gap-2 ">
            <div className="w-6 justify-center flex">
              <Image src={logout} width={18} />
            </div>
            Keluar
          </div>
        </DropdownItem>
        {/* <DropdownItem key="switch">
            <DarkModeSwitch />
          </DropdownItem> */}
      </DropdownMenu>
    </Dropdown>
  );
};
