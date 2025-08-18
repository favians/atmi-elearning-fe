"use client";
import InputForm from "@/components/form/input-form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import TextAreaForm from "@/components/form/textarea-form";
import { Avatar } from "@heroui/avatar";
import toast from "react-hot-toast";

export default function ProfileForm() {
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "Dhian Jois",
      email: "dhianjois@gmail.com",
      phone: "+6283834499312",
      alamat:
        "Jl. M.H. Thamrin, RT.2/RW.3, Gambir, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta",
    },
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
  return (
    <div className="p-4 w-3/4">
      <form onSubmit={handleSubmit(onSubmit)} className="gap-4 flex">
        <div>
          <Avatar
            size="lg"
            className="w-20 h-20"
            radius="md"
            name="profile_url"
            src={control}
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
            placeholder="Nama"
            name="name"
            control={control}
            labelPlacement="outside"
          />
          <InputForm
            label="Email"
            placeholder="Email"
            name="email"
            type="email"
            control={control}
            labelPlacement="outside"
          />

          <InputForm
            label="Nomor Telepon"
            placeholder="Nomor Telepon"
            name="phone"
            control={control}
            labelPlacement="outside"
          />

          <TextAreaForm
            label="Alamat"
            placeholder="Alamat"
            name="alamat"
            control={control}
            labelPlacement="outside"
          />

          <div className="flex items-center mt-2 justify-end gap-2">
            <Button
              onPress={() => router.back()}
              color="primary"
              variant="light"
            >
              Batalkan
            </Button>
            <Button className="w-36" color="primary" type="submit">
              Simpan Perubahan
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
