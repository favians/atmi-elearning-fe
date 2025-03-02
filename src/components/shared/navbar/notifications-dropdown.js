import { NotificationIcon } from "@/assets/icons/navbar/notification-icon";

import React from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@heroui/dropdown";
import { NavbarItem } from "@heroui/navbar";
import { Badge } from "@heroui/badge";

export const NotificationsDropdown = () => {
  return (
    <Dropdown
      placement="bottom-end"
      // onOpenChange={(isOpen) => setIsOpen(isOpen)}
    >
      <DropdownTrigger className="mt-1">
        <NavbarItem>
          <Badge content={2} size="sm" shape="circle" color="danger">
            <NotificationIcon size={22} />
          </Badge>
        </NavbarItem>
      </DropdownTrigger>
      <DropdownMenu className="w-80" aria-label="Avatar Actions">
        <DropdownSection title="Notifications">
          <DropdownItem
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
            key={1}
          >
            <div className="flex w-full items-center">
              <div className="flex-1">
                <div className="font-normal text-sm">notif content</div>

                <div className="font-light text-xs text-gray">22 nov</div>
              </div>
              <div className="w-2 h-2 rounded-full bg-danger" />
            </div>
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
