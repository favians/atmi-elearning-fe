import NextLink from "next/link";
import React, { useState } from "react";
import clsx from "clsx";
import { useSidebarContext } from "./layout-context";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { IoChevronDown, IoChevronForward } from "react-icons/io5";

export const SidebarItem = ({
  iconActive,
  onClick,
  defaultExpandedKeys,
  icon,
  title,
  isActive,
  disableHover,
  items,
  href = "",
  noPadding,
}) => {
  const { _, setCollapsed } = useSidebarContext();
  const [isHovering, setIsHovered] = useState(false);

  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  const handleClick = () => {
    if (window.innerWidth < 768) {
      setCollapsed();
    }
  };

  if (items != null) {
    return (
      <Accordion
        defaultExpandedKeys={defaultExpandedKeys}
        showDivider={false}
        className="lsp-accordion"
      >
        <AccordionItem
          indicator={({ isOpen }) =>
            isOpen ? <IoChevronForward /> : <IoChevronDown />
          }
          startContent={
            <SidebarItem
              title={title}
              icon={icon}
              iconActive={iconActive}
              noPadding
              isActive={isActive}
              disableHover
            />
          }
          key="1"
          aria-label="Accordion 1"
          children={items}
          className="lsp-accordion"
          classNames={{
            trigger: "py-0",
          }}
        />
      </Accordion>
    );
  }

  return (
    <NextLink
      href={href}
      onClick={() => {
        onClick && onClick();
      }}
      className="text-default-900 active:bg-none max-w-full "
    >
      <div
        className={clsx(
          isActive
            ? "text-primary bg-[#E8F5EB]  "
            : !disableHover
              ? " hover:text-primary text-black hover:bg-[#E8F5EB] "
              : "",
          noPadding ? "px-1.5" : "px-3.5",
          "flex gap-2 w-full min-h-[44px] h-full my-1  items-center  rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]",
        )}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={handleClick}
      >
        {isHovering || isActive ? iconActive : icon}
        <span className="text-medium">{title}</span>
      </div>
    </NextLink>
  );
};
