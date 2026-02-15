"use client";
import React, { useState } from "react";
// import { AtmiLogo } from '@/assets/icons/atmilogo';

import logo from "@/assets/images/logo/logo.png";
import Image from "next/image";
import { Dropdown, DropdownTrigger } from "@heroui/dropdown";

export const CompaniesDropdown = () => {
  const [company] = useState({
    name: "Acme Co.",
    location: "Palo Alto, CA",
    logo: <Image src={logo} alt={"Logo"} width={70} className="h-fit " />,
  });
  return (
    <Dropdown
      classNames={{
        base: "w-full min-w-[260px]",
      }}
    >
      <DropdownTrigger className="cursor-pointer">
        <div className="flex items-center gap-2">{company.logo}</div>
      </DropdownTrigger>
    </Dropdown>
  );
};
