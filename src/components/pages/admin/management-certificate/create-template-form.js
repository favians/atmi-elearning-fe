"use client";
import InputForm from "@/components/form/input-form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import toast from "react-hot-toast";
import UploadForm from "@/components/form/upload-form";

export default function CreateTemplateForm() {
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      course: "",
      file: null,
    },
  });
  const onSubmit = (data) => {
    toast.success("Sukses update");
  };

  const animals = [
    { key: "cat", label: "Cat" },
    { key: "dog", label: "Dog" },
    { key: "elephant", label: "Elephant" },
    { key: "lion", label: "Lion" },
  ];

  return (
    <div className="flex gap-2">
      <div className="p-6 w-1/2">
        <form onSubmit={handleSubmit(onSubmit)} className="gap-6 flex">
          <div className="flex flex-1 gap-4 flex-col">
            <UploadForm
              label="Upload Sertifikat"
              placeholder="cth. 123456789"
              name="file"
              control={control}
              labelPlacement="outside"
            />

            <InputForm
              label="Nama Template"
              placeholder="cth. Template Sertifikat"
              name="template"
              control={control}
              labelPlacement="outside"
            />

            <div className="flex items-center mt-2 justify-end gap-2">
              <Button color="primary" variant="light">
                Batalkan
              </Button>
              <Button className="w-36" color="primary" type="submit">
                Simpan
              </Button>
            </div>
          </div>
        </form>
      </div>
      {/* <div className="border-1 m-4 p-4 flex flex-1 flex-col rounded-lg border-gray-200 ">
        <h3 className={headline({ size: "sm" })}>Izin yang diberikan</h3>
        <h4 className={subtitle({ size: "sm" })}>
          Admin bisa melihat dan edit modul yang diizinkan
        </h4>
      </div> */}
    </div>
  );
}
