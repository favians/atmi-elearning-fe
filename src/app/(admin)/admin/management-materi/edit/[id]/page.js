"use client";

import EditMateriForm from "@/components/pages/admin/management-materi/edit-materi-form";
import { headline, subtitle } from "@/components/primitives";
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useState } from "react";

export default function EditMaterialPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const handleStep = (value) => {
    setStep(value);
  };

  return (
    <>
      <section className="flex flex-col justify-center gap-1 p-6">
        <div
          onClick={() => router.push(`/admin/management-certificate`)}
          className="flex cursor-pointer items-center gap-2 text-primary"
        >
          <FaArrowLeftLong />
          <h1 className={subtitle({ color: "primary" })}>Manajemen Materi</h1>
        </div>

        <div className=" max-w-lg justify-center">
          <h1 className={headline({})}>Ubah Manajemen Materi</h1>
        </div>
      </section>

      <div className="flex bg-white flex-wrap flex-grow flex-col">
        <EditMateriForm step={step} handleStep={handleStep} />
      </div>
    </>
  );
}
