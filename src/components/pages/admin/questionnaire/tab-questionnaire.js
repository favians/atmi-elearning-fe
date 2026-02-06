"use client";

import { useRouter, useSearchParams } from "next/navigation";
import KuisionerTemplate from "./kuisionerTemplate";
import UlasanTemplate from "./ulasanTemplate";

export default function TabQuestionnaire() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeTab = searchParams.get("tab") || "kuisioner";

  const handleChangeTab = (tab) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full mx-auto">
      {/* Tab Header */}
      <div className="flex border-b border-gray-200 bg-slate-100 px-4">
        <button
          onClick={() => handleChangeTab("kuisioner")}
          className={`px-4 py-2 text-sm font-normal transition
            ${
              activeTab === "kuisioner"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-primary"
            }`}
        >
          Template Kuesioner
        </button>

        <button
          onClick={() => handleChangeTab("ulasan")}
          className={`px-4 py-2 text-sm font-normal transition
            ${
              activeTab === "ulasan"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-primary"
            }`}
        >
          Ulasan Trainee
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6 px-6">
        {activeTab === "kuisioner" && <KuisionerTemplate />}
        {activeTab === "ulasan" && <UlasanTemplate />}
      </div>
    </div>
  );
}
