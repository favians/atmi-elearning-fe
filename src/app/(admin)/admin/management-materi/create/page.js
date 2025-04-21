"use client";
import CreateMateriForm from "@/components/pages/admin/management-materi/create-materi-form";
import { headline, subtitle } from "@/components/primitives";
import { useRouter } from "next/navigation";
import { Stepper } from "react-form-stepper";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function CreateManajemenMateriPage() {
  const router = useRouter();
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
        <Stepper
          steps={[{ label: "Tentang Pelatihan" }, { label: "Konten Materi" }]}
          activeStep={1}
          //   connectorStyleConfig={{ size: 2, completedColor: "#009848" }}
          //   styleConfig={{ size: 24, activeColor: "#009848" }}
        />
      </section>
      <div className="flex bg-white flex-wrap flex-grow flex-col">
        <CreateMateriForm />
      </div>
    </>
  );
}
