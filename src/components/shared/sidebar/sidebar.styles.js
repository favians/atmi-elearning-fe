"use client";
import { tv } from "tailwind-variants";

export const SidebarWrapper = tv({
  base: "transition-transform min-h-full flex  w-72  overflow-y-auto border-r border-divider flex-col py-6 px-3 md:ml-0 ",

  variants: {
    collapsed: {
      true: "translate-x-0 ml-0 [display:inherit]",
    },
  },
  // ""
  //   "@md": {
  //     marginLeft: "0",
  //     display: "flex",
  //     position: "static",
  //     height: "100vh",
  //     transform: "translateX(0)",
  //   },
  //   variants: {
  //     collapsed: {
  //       true: {
  //         display: "inherit",
  //         marginLeft: "0 ",
  //         transform: "translateX(0)",
  //       },
  //     },
  //   },
});
export const Overlay = tv({
  base: "bg-[rgb(15_23_42/0.3)] fixed inset-0 z-[201] opacity-80 transition-opacity md:hidden md:z-auto md:opacity-100",
});

export const Header = tv({
  base: "flex-none gap-8 items-center px-6",
});

export const Body = tv({
  base: "flex  flex-col gap-2 mt-2 px-2",
});

export const Footer = tv({
  base: "flex-none z-10 mb-32 items-center justify-center gap-2  px-4 md:pt-10 md:pb-0",
});

export const Sidebar = Object.assign(SidebarWrapper, {
  Header,
  Body,
  Overlay,
  Footer,
});
