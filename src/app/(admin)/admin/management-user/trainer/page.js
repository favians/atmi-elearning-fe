"use client";
import { headline } from "@/components/primitives";
import { Button } from "@heroui/button";
import { FaPlus } from "react-icons/fa";
import FilterTrainer from "@/components/pages/admin/management-user/trainer/filter-trainer";
import TableTrainer from "@/components/pages/admin/management-user/trainer/table-trainer";
import { useRouter } from "next/navigation";

export default function ManagementUserTrainerPage() {
  const router = useRouter();
  return (
    <>
      <section className="flex flex-col justify-center gap-4 p-4">
        <div className="items-center justify-between flex">
          <h1 className={headline({})}>Trainer</h1>
          <Button
            radius="sm"
            startContent={<FaPlus />}
            color="primary"
            onPress={() => router.push(`/admin/management-user/trainer/create`)}
          >
            Tambahkan Trainer
          </Button>
        </div>
      </section>
      <div className="bg-white grow py-2  px-4 gap-4 flex border-t flex-col">
        <FilterTrainer />
        <TableTrainer />
      </div>
    </>
  );
}
