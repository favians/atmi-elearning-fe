"use client";
import { headline } from "@/components/primitives";
import { Button } from "@heroui/button";
import { FaPlus } from "react-icons/fa";
import FilterTrainee from "@/components/pages/admin/management-user/trainee/filter-trainee";
import TableTrainee from "@/components/pages/admin/management-user/trainee/table-trainee";
import { useRouter } from "next/navigation";

export default function ManagementUserTraineePage() {
  const router = useRouter();
  return (
    <>
      <section className="flex flex-col justify-center gap-4 p-4">
        <div className="items-center justify-between flex">
          <h1 className={headline({})}>Trainee</h1>
          <Button
            radius="sm"
            startContent={<FaPlus />}
            color="primary"
            onPress={() => router.push(`/admin/management-user/trainee/create`)}
          >
            Tambahkan Trainee
          </Button>
        </div>
      </section>
      <div className="bg-white grow py-2 px-4 gap-4 flex border-t flex-col">
        <TableTrainee />
      </div>
    </>
  );
}
