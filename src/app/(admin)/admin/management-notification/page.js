"use client";
import { headline } from "@/components/primitives";
import { Button } from "@heroui/button";
import { FaPlus } from "react-icons/fa";
import FilterNotification from "@/components/pages/admin/management-notification/filter-notification";
import TableNotification from "@/components/pages/admin/management-notification/table-notification";

export default function ManagementNotificationPage() {
  return (
    <>
      <section className="flex flex-col justify-center gap-4 p-4">
        <div className="items-center justify-between flex">
          <h1 className={headline({})}>Notifikasi</h1>
          <Button
            radius="sm"
            startContent={<FaPlus />}
            color="primary"
            onPress={() => router.push(`/dashboard/training/1`)}
          >
            Buat Pengingat
          </Button>
        </div>
      </section>
      <div className="bg-white grow py-2 px-4 gap-4 flex border-t flex-col">
        <FilterNotification />
        <TableNotification />
      </div>
    </>
  );
}
