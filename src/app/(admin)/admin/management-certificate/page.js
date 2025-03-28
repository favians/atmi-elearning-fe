"use client";
import { headline } from "@/components/primitives";
import { Button } from "@heroui/button";
import { FaPlus } from "react-icons/fa";
import TableCertificate from "@/components/pages/admin/management-certificate/table-certificate";
import FilterCertificate from "@/components/pages/admin/management-certificate/filter-certificate";

export default function ManagementCertificate() {
  return (
    <>
      <section className="flex flex-col justify-center gap-4 p-4">
        <div className="items-center justify-between flex">
          <h1 className={headline({})}>Manajemen Sertifikat</h1>
          <div className="flex gap-4">
            <Button
              radius="sm"
              className="bg-white border-default-200"
              color="primary"
              variant="bordered"
              onPress={() => router.push(`/dashboard/training/1`)}
            >
              Buat Template
            </Button>

            <Button
              radius="sm"
              startContent={<FaPlus size={10} />}
              color="primary"
              onPress={() => router.push(`/dashboard/training/1`)}
            >
              Buat Sertifikat
            </Button>
          </div>
        </div>
      </section>
      <div className="bg-white grow py-2 px-4 gap-4 flex border-t flex-col">
        <FilterCertificate />
        <TableCertificate />
      </div>
    </>
  );
}
