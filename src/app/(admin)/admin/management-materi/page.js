"use client";
import { headline } from "@/components/primitives";
import { Button } from "@heroui/button";
import { FaPlus } from "react-icons/fa";
import FilterMateri from "@/components/pages/admin/management-materi/filter-materi";
import TableMateri from "@/components/pages/admin/management-materi/table-materi";

export default function ManagementMateri() {
  return (
    <>
      <section className="flex flex-col justify-center gap-4 p-4">
        <div className="items-center justify-between flex">
          <h1 className={headline({})}>Manajemen Materi</h1>
          <Button
            radius="sm"
            startContent={<FaPlus />}
            color="primary"
            onPress={() => router.push(`/dashboard/training/1`)}
          >
            Tambahkan Materi
          </Button>
        </div>
      </section>
      <div className="bg-white grow py-2 px-4 gap-4 flex border-t flex-col">
        <FilterMateri />
        <TableMateri />
      </div>
    </>
  );
}
