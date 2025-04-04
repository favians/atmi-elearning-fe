"use client";
import CreateTemplateForm from "@/components/pages/admin/management-certificate/create-template-form";
import { headline, subtitle } from "@/components/primitives";
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function CreateTemplatePage() {
  const router = useRouter();
  return (
    <>
      <section className="flex flex-col justify-center gap-1 p-6">
        <div
          onClick={() => router.push(`/admin/management-certificate`)}
          className="flex cursor-pointer items-center gap-2 text-primary"
        >
          <FaArrowLeftLong />
          <h1 className={subtitle({ color: "primary" })}>Sertifikat</h1>
        </div>
        <div className="inline-block max-w-lg justify-center">
          <h1 className={headline({})}>Buat Template</h1>
        </div>
      </section>
      <div className="flex bg-white flex-wrap flex-grow flex-col">
        <CreateTemplateForm />
      </div>
    </>
  );
}
