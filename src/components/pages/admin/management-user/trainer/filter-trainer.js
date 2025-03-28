"use client";
import InputForm from "@/components/form/input-form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import SelectForm from "@/components/form/select-form";
import { Button } from "@heroui/button";

export default function FilterTrainer() {
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
  const animals = [
    { key: "cat", label: "Cat" },
    { key: "dog", label: "Dog" },
    { key: "elephant", label: "Elephant" },
    { key: "lion", label: "Lion" },
  ];

  const sort = [
    { key: "asc", label: "ASC" },
    { key: "desc", label: "DESC" },
  ];
  return (
    <div className="-mt-2">
      <form onSubmit={handleSubmit(onSubmit)} className=" gap-4 flex ">
        <InputForm
          label="Search"
          placeholder="Search..."
          name="username"
          control={control}
          startContent={<CiSearch />}
          labelPlacement="outside"
          classNames={{ label: "hidden" }}
        />
        <SelectForm
          label="Keahlian"
          placeholder="Keahlian"
          name="course"
          control={control}
          data={animals}
          labelPlacement="outside"
          classNames={{ label: "hidden" }}
        />

        <SelectForm
          label="Sort"
          placeholder="Sort"
          name="course"
          control={control}
          data={sort}
          labelPlacement="outside"
          classNames={{ label: "hidden" }}
        />

        <Button className="min-w-28 mt-6" color="primary">
          Reset Filter
        </Button>
      </form>
    </div>
  );
}
