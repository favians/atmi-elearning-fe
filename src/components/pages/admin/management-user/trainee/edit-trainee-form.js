"use client";
import InputForm from "@/components/form/input-form";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import TextAreaForm from "@/components/form/textarea-form";
import { Avatar } from "@heroui/avatar";
import toast from "react-hot-toast";
import InputPasswordForm from "@/components/form/input-password-form";
import SelectForm from "@/components/form/select-form";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { queryClientKeys } from "@/constants/query-client-keys";
import { editTraineeFormSchema } from "./validation/schema";
import { useGetTrainingList } from "@/hooks/admin/useGetTraining";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetTrainee } from "@/hooks/admin/useGetTrainee";
import { Spinner } from "@heroui/spinner";
import useUpdateTrainee from "@/hooks/admin/useUpdateTrainee";

export default function EditTraineeForm() {
  const router = useRouter();
  const params = useParams();
  const { mutate, isPending: isLoading } = useUpdateTrainee();
  const { data, isLoading: isLoadingTrainee } = useGetTrainee({
    params: {
      limit: 1,
      id: params?.id,
    },
  });
  const { data: dataTraining, isLoading: isLoadingTraining } =
    useGetTrainingList();
  const [image, setImage] = useState("");
  const { control, handleSubmit, setValue, reset } = useForm({
    mode: "onChange",
    resolver: yupResolver(editTraineeFormSchema),
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data?.data?.length > 0) {
      const traineeData = data?.data[0];
      reset({
        id: traineeData.id || 0,
        full_name: traineeData.full_name || "",
        email: traineeData.email || "",
        instance: traineeData.instance || "",
        phone: traineeData.phone || "",
        address: traineeData.address || "",
        profile_photo: null,
        training_id: String(traineeData?.user_training?.[0]?.training_id || ""),
      });
      setImage(traineeData.profile_url || "");
    }
  }, [data, reset]);
  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        toast.success("Berhasil mengubah trainee");
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

  return (
    <div className="p-6 w-3/4">
      <form onSubmit={handleSubmit(onSubmit)} className="gap-6 flex">
        {isLoadingTrainee ? (
          <Spinner />
        ) : (
          <>
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
                isRequired
                control={control}
                labelPlacement="outside"
              />
              <InputForm
                label="Email"
                placeholder="cth. rizal.candra@gmail.com"
                name="email"
                isRequired
                type="email"
                control={control}
                labelPlacement="outside"
              />

              <InputForm
                label="Nomor Telepon"
                placeholder="cth. 0838344992211"
                name="phone"
                isRequired
                control={control}
                labelPlacement="outside"
              />

              <InputForm
                label="Asal Instansi"
                placeholder="cth. PT. ABC"
                name="instance"
                isRequired
                control={control}
                labelPlacement="outside"
              />

              <TextAreaForm
                label="Alamat"
                placeholder="cth. Jl. Raya No. 1, Jakarta"
                name="address"
                isRequired
                control={control}
                labelPlacement="outside"
              />

              <InputPasswordForm
                label="Password Baru"
                placeholder="cth. qwerty123"
                name="password"
                control={control}
                description="Kosongkan jika tidak ingin mengubah password"
                labelPlacement="outside"
              />

              <SelectForm
                label="Pelatihan"
                placeholder="Pilih Pelatihan"
                name="training_id"
                control={control}
                data={dataTraining || []}
                isDisabled
                isLoading={isLoadingTraining}
                labelPlacement="outside" // Default to "3" if no training_id is available
              />

              {/* <DatePickerForm
            label="Tanggal Pelatihan"
            placeholder="Tanggal"
            name="date"
            control={control}
            data={animals}
            labelPlacement="outside"
          /> */}

              <div className="flex items-center mt-2 justify-end gap-2">
                <Button
                  onPress={() => router.back()}
                  color="primary"
                  variant="light"
                >
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
          </>
        )}
      </form>
    </div>
  );
}
