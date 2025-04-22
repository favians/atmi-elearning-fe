"use client";
import EditTrainerForm from "@/components/pages/admin/management-user/trainer/edit-trainer-form";
import { headline, subtitle } from "@/components/primitives";
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function EditTrainerPage() {
  const router = useRouter();
  return (
    <>
      <section className="flex flex-col justify-center gap-1 p-6">
        <div
          onClick={() => router.push(`/admin/management-user/trainee`)}
          className="flex cursor-pointer items-center gap-2 text-primary"
        >
          <FaArrowLeftLong />
          <h1 className={subtitle({ color: "primary" })}>Trainer</h1>
        </div>
        <div className="inline-block max-w-lg justify-center">
          <h1 className={headline({})}>Ubah Trainer</h1>
        </div>
      </section>
      <div className="flex bg-white flex-wrap flex-grow flex-col">
        <EditTrainerForm />
      </div>
    </>
  );
}
