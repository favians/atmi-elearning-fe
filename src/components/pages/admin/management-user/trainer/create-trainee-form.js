"use client";
import InputForm from "@/components/form/input-form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import TextAreaForm from "@/components/form/textarea-form";
import { Avatar } from "@heroui/avatar";
import toast from "react-hot-toast";
import InputPasswordForm from "@/components/form/input-password-form";
import SelectForm from "@/components/form/select-form";
import DatePickerForm from "@/components/form/date-picker-form";

export default function CreateTrainerForm() {
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => {
    toast.success("Sukses update");
  };
  const onChangePhoto = (e) => {
    if (e.target.files?.[0]?.size > 500000) {
      toast.error("File tidak boleh lebih dari 500kbps");
      return;
    }
    if (
      e.target.files?.[0]?.type !== "image/png" &&
      e.target.files?.[0]?.type !== "image/jpeg" &&
      e.target.files?.[0]?.type !== "image/jpg"
    ) {
      toast.error(`File format ${e.target.files?.[0]?.type} belum support`);
      return;
    }

    const formData = new FormData();
  };

  const animals = [
    { key: "cat", label: "Cat" },
    { key: "dog", label: "Dog" },
    { key: "elephant", label: "Elephant" },
    { key: "lion", label: "Lion" },
  ];

  return (
    <div className="p-6 w-3/4">
      <form onSubmit={handleSubmit(onSubmit)} className="gap-6 flex">
        <div>
          <Avatar
            size="lg"
            className="w-20 h-20"
            radius="md"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
          <label className="text-sm text-secondary text-center mt-2 cursor-pointer">
            <div className="mt-1">Ubah Foto</div>
            <input
              type="file"
              className="hidden"
              onChange={onChangePhoto}
              value=""
              accept={"image/png, image/jpg, image/jpeg"}
            />
          </label>
        </div>
        <div className="flex flex-1 gap-4 flex-col">
          <InputForm
            label="Nama"
            placeholder="cth. Rizal Candra"
            name="name"
            control={control}
            labelPlacement="outside"
          />
          <InputForm
            label="Email"
            placeholder="cth. rizal.candra@gmail.com"
            name="email"
            type="email"
            control={control}
            labelPlacement="outside"
          />

          <InputForm
            label="Pekerjaan atau Keahlian"
            placeholder="cth. Kepala Teknisi"
            name="job"
            control={control}
            labelPlacement="outside"
          />

          <InputForm
            label="Perusahaan"
            placeholder="cth. PT. ABC"
            name="instansi"
            control={control}
            labelPlacement="outside"
          />

          <InputForm
            label="Nomor Telepon"
            placeholder="cth. 0838344992211"
            name="phone"
            control={control}
            labelPlacement="outside"
          />

          <TextAreaForm
            label="Tentang Trainer"
            placeholder="cth. Trainer berpengalaman di bidang..."
            name="about"
            control={control}
            labelPlacement="outside"
          />

          <InputForm
            label="LinkedIn Link"
            placeholder="cth. https://www.linkedin.com/in/rizal-candra/"
            name="linkedin"
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
  );
}
