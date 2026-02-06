"use client";

import TableQuestionnaire from "@/components/pages/admin/questionnaire/table-questionnaire";
import { useParams, useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

export default function CategoryPage() {
  const { id } = useParams();
  const router = useRouter();

  return (
    <>
      <section className="flex flex-col justify-center gap-2 p-4">
        {/* 🔙 BACK */}
        <button
          onClick={() => router.back()}
          className="ml-4 flex items-center gap-2 text-sm text-primary hover:text-primary w-fit"
        >
          <FiArrowLeft />
          <span>Kuesioner</span>
        </button>

        <div className="items-center justify-between flex">
          <h1 className="ml-4 text-2xl font-semibold text-[#232933]">
            Kuesioner Pelatihan
          </h1>
        </div>
      </section>

      <div className="bg-white grow gap-4 flex flex-col">
        <div className="mt-6 px-6">
          <TableQuestionnaire id={id} />
          {/* <QuestionnaireTrainer id={id} /> */}
        </div>
      </div>
    </>
  );
}
