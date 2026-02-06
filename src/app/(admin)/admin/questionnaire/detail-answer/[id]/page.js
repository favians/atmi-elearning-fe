"use client";

import DetailAnswerQuestionaire from "@/components/pages/admin/questionnaire/detailAnswerQuestionaire";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

export default function CategoryPage() {
  const { id } = useParams();
  const router = useRouter();
  const [meta, setMeta] = useState(null);

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
            Detail Jawaban {meta?.createdBy}
          </h1>
        </div>
      </section>

      <div className="bg-white grow gap-4 flex flex-col">
        <div className="mt-6 px-6">
          <DetailAnswerQuestionaire
            id={id}
            onLoaded={(value) => setMeta(value)}
          />
        </div>
      </div>
    </>
  );
}
