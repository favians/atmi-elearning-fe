"use client";
import InputForm from "@/components/form/input-form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import toast from "react-hot-toast";
import SelectForm from "@/components/form/select-form";
import DatePickerForm from "@/components/form/date-picker-form";
import UploadForm from "@/components/form/upload-form";
import TextAreaForm from "@/components/form/textarea-form";
import UploadDragForm from "@/components/form/upload-drag-form";

export default function CreateMateriForm() {
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
            <UploadDragForm name="cover" control={control} />
            <InputForm
              label="Nama Pelatihan"
              placeholder="cth. Pelatihan 1"
              name="name"
              control={control}
              labelPlacement="outside"
            />

            <TextAreaForm
              label="Deskripsi Pendek"
              placeholder="cth. Tulis deskripsi singkat disini"
              name="description_short"
              control={control}
              labelPlacement="outside"
            />
            <TextAreaForm
              label="Deskripsi Lengkap"
              placeholder="cth. Tulis deskripsi lengkap disini"
              name="description"
              control={control}
              labelPlacement="outside"
            />

            <InputForm
              label="Harga"
              placeholder="cth. 50.000"
              name="price"
              startContent={
                <div className="bg-grey-400 p-1 rounded-lg px-2 font-semibold -ml-2.5">
                  Rp
                </div>
              }
              control={control}
              labelPlacement="outside"
            />

            <InputForm
              label="Tambahkan Diskon"
              placeholder="cth. 20"
              name="diskon"
              endContent={
                <div className="bg-grey-400 p-1 rounded-lg px-2 font-semibold -mr-2.5">
                  %
                </div>
              }
              control={control}
              labelPlacement="outside"
            />

            <SelectForm
              label="Trainer"
              placeholder="Pilih trainer"
              name="trainer"
              control={control}
              data={animals}
              labelPlacement="outside"
            />

            <div className="flex items-center mt-2 justify-end gap-2">
              <Button color="primary" variant="light">
                Batalkan
              </Button>
              <Button className="w-36" color="primary" type="submit">
                Selanjutnya
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
