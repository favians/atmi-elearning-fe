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
import { useState } from "react";
import useCreateTrainee from "@/hooks/admin/useCreateTrainee";
import { useQueryClient } from "@tanstack/react-query";
import { queryClientKeys } from "@/constants/query-client-keys";
import { yupResolver } from "@hookform/resolvers/yup";
import { traineeFormSchema } from "./validation/schema";

export default function CreateTraineeForm() {
  const router = useRouter();
  const { mutate, isLoading } = useCreateTrainee();
  const [image, setImage] = useState("");
  const { control, handleSubmit, setValue } = useForm({
    mode: "onChange",
    resolver: yupResolver(traineeFormSchema),
  });
  const queryClient = useQueryClient();
  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        toast.success("Berhasil menambahkan trainee");
        queryClient.invalidateQueries([queryClientKeys.GET_INTERNAL_TRAINEE]);
        router.back();
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
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
    if (e.target.files?.[0]) {
      setValue("profile_photo", e.target.files?.[0]);
      getBase64(e);
    }
  };

  const getBase64 = (e) => {
    var file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = function (error) {
      setImage("");
    };
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
            src={image || ""}
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
            name="full_name"
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
            label="Nomor Telepon"
            placeholder="cth. 0838344992211"
            name="phone"
            control={control}
            labelPlacement="outside"
          />

          <InputForm
            label="Asal Instansi"
            placeholder="cth. PT. ABC"
            name="instance"
            control={control}
            labelPlacement="outside"
          />

          <TextAreaForm
            label="Alamat"
            placeholder="cth. Jl. Raya No. 1, Jakarta"
            name="address"
            control={control}
            labelPlacement="outside"
          />

          <InputPasswordForm
            label="Password"
            placeholder="cth. qwerty123"
            name="password"
            control={control}
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
            label="Tanggal Pelatihan"
            placeholder="Tanggal"
            name="date"
            control={control}
            data={animals}
            labelPlacement="outside"
          />

          <div className="flex items-center mt-2 justify-end gap-2">
            <Button color="primary" variant="light">
              Batalkan
            </Button>
            <Button
              className="w-36"
              isLoading={isLoading}
              color="primary"
              type="submit"
            >
              Simpan
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
