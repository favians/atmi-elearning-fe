import NextLink from "next/link";
import React, { useState } from "react";
import clsx from "clsx";
import { useSidebarContext } from "./layout-context";

export const SidebarItem = ({
  iconActive,
  onClick,
  icon,
  title,
  isActive,
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
            : " hover:text-primary text-black hover:bg-[#E8F5EB] ",
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
