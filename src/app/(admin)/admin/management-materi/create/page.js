"use client";
import CreateMateriForm from "@/components/pages/admin/management-materi/create-materi-form";
import { headline, subtitle } from "@/components/primitives";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Stepper } from "react-form-stepper";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function CreateManajemenMateriPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const handleStep = (step) => {
    setStep(step);
  };
  return (
    <>
      <section className="flex justify-between gap-1 p-6">
        <div className="flex flex-col items-center gap-2">
          <div
            onClick={() => router.push(`/admin/management-materi`)}
            className="flex cursor-pointer items-center gap-2 text-primary"
          >
            <FaArrowLeftLong />
            <h1 className={subtitle({ color: "primary" })}>Manajemen Materi</h1>
          </div>
          <div className="inline-block max-w-lg justify-center">
            <h1 className={headline({})}>Buat Pelatihan</h1>
          </div>
        </div>

        <div className="flex items-center relative space-x-4">
          <div className="w-3/4 left-5  absolute top-5 h-0.5 bg-green"></div>
          <div className="flex flex-col z-10">
            <div className="w-6 h-6 rounded-full bg-green flex items-center justify-center text-white text-sm">
              ✓
            </div>
            <span className={subtitle({ color: "green", size: "sm" })}>
              Tentang Pelatihan
            </span>
          </div>
          <div className="flex-1 h-0.5 bg-green-400"></div>

          <div className="flex flex-col z-10 bg-gray-100">
            <div className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 text-sm">
              2
            </div>

            <span className={subtitle({ color: "green", size: "sm" })}>
              Konten Materi
            </span>
          </div>
        </div>
      </section>
      <div className="flex bg-white overflow-y-hidden flex-wrap flex-grow flex-col">
        <CreateMateriForm step={step} handleStep={handleStep} />
      </div>
    </>
  );
}
