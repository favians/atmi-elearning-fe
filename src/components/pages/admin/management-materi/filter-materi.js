"use client";
import InputForm from "@/components/form/input-form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CiSearch } from "react-icons/ci";

export default function FilterMateri() {
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      username: "",
    },
  });
  const onSubmit = (data) => {
    router.push("/dashboard/training");
  };
  return (
    <div className="-mt-2">
      <form onSubmit={handleSubmit(onSubmit)} className=" gap-4 flex max-w-sm">
        <InputForm
          label="Search"
          placeholder="Cari Materi Pelatihan"
          name="username"
          control={control}
          startContent={<CiSearch />}
          labelPlacement="outside"
          classNames={{ label: "hidden" }}
        />
      </form>
    </div>
  );
}
