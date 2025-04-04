"use client";
import InputForm from "@/components/form/input-form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import toast from "react-hot-toast";
import InputPasswordForm from "@/components/form/input-password-form";
import { headline, subtitle } from "@/components/primitives";
import SelectForm from "@/components/form/select-form";
import DatePickerForm from "@/components/form/date-picker-form";
import UploadForm from "@/components/form/upload-form";

export default function CreateCertificateForm() {
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
            <SelectForm
              label="Nama Trainee"
              placeholder="Pilih User"
              name="name"
              control={control}
              data={animals}
              labelPlacement="outside"
            />

            <SelectForm
              label="Pelatihan"
              placeholder="Pilih Pelatihan"
              name="course"
              control={control}
              data={animals}
              labelPlacement="outside"
            />

            <DatePickerForm
              label="Tanggal Terbit"
              placeholder="Tanggal"
              name="date"
              control={control}
              data={animals}
              labelPlacement="outside"
            />
            <InputForm
              label="Nomor Sertifikat"
              placeholder="cth. 123456789"
              name="certificate_number"
              control={control}
              labelPlacement="outside"
            />

            <UploadForm
              label="Upload Sertifikat"
              placeholder="cth. 123456789"
              name="file"
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
