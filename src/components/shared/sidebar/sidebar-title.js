import { subtitle } from "@/components/primitives";
import { Divider } from "@heroui/divider";
import React from "react";
export const SidebarTitle = ({ title, items }) => {
  return (
    <div className="my-2">
      <h4
        className={subtitle({
          class: "font-normal ml-4 mb-2 tracking-[3px] leading-5",
          color: "grey",
          size: "sm",
        })}
      >
        {title}
      </h4>
      {items &&
        items?.map((item) => {
          return item;
        })}
      <Divider className="mt-4" />
    </div>
  );
};
