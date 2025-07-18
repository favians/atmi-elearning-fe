"use client";
import TableAdmin from "@/components/pages/admin/management-user/admin/table-admin";
import { headline } from "@/components/primitives";
import { Button } from "@heroui/button";
import { Tab, Tabs } from "@heroui/tabs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function ManagementUserAdminPage() {
  const tabs = ["Aktif", "Non-Aktif"];

  const [selected, setSelected] = useState("Aktif");
  const router = useRouter();
  return (
    <>
      <section className="flex flex-col justify-center gap-4 p-4">
        <div className="items-center justify-between flex">
          <h1 className={headline({})}>Admin</h1>
          <Button
            radius="sm"
            startContent={<FaPlus />}
            color="primary"
            onPress={() => router.push(`/admin/management-user/admin/create`)}
          >
            Tambahkan Admin
          </Button>
        </div>
      </section>

      <div className="flex flex-wrap flex-grow flex-col">
        <Tabs
          aria-label="Options"
          classNames={{
            tabList:
              "gap-8 w-full relative w-fit rounded-none p-0 border-divider mx-6",
            cursor: "w-full bg-blue",
            tab: "px-0 py-0 h-12 ",
            tabContent: "group-data-[selected=true]:text-blue",
            panel: "bg-white grow p-4 flex border-t gap-4 flex-col",
          }}
          color="primary"
          variant="underlined"
          selectedKey={selected}
          onSelectionChange={setSelected}
        >
          {tabs.map((item) => (
            <Tab key={item} title={item}>
              <TableAdmin tabKey={selected} />
            </Tab>
          ))}
        </Tabs>
      </div>
    </>
  );
}
