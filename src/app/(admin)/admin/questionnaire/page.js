"use client";
import { headline } from "@/components/primitives";
import { Button } from "@heroui/button";
import { FaPlus } from "react-icons/fa";
import FilterQuestionnaire from "@/components/pages/admin/questionnaire/filter-questionnaire";
import TableQuestionnaire from "@/components/pages/admin/questionnaire/table-questionnaire";

export default function QuestionnairePage() {
  return (
    <>
      <section className="flex flex-col justify-center gap-4 p-4">
        <div className="items-center justify-between flex">
          <h1 className={headline({})}>Kuesioner</h1>
          <Button
            radius="sm"
            startContent={<FaPlus />}
            color="primary"
            onPress={() => router.push(`/dashboard/training/1`)}
          >
            Tambahkan Kuesioner
          </Button>
        </div>
      </section>
      <div className="bg-white grow py-2 px-4 gap-4 flex border-t flex-col">
        <FilterQuestionnaire />
        <TableQuestionnaire />
      </div>
    </>
  );
}
