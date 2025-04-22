"use client";
import InputForm from "@/components/form/input-form";
import { useForm } from "react-hook-form";
import { Button } from "@heroui/button";
import TextAreaForm from "@/components/form/textarea-form";
import { Avatar } from "@heroui/avatar";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { queryClientKeys } from "@/constants/query-client-keys";
import useCreateTrainer from "@/hooks/admin/useCreateTrainer";
import { useGetTrainer } from "@/hooks/admin/useGetTrainer";
import { useParams } from "next/navigation";
import { Spinner } from "@heroui/spinner";
import { yupResolver } from "@hookform/resolvers/yup";
import { trainerFormSchema } from "./validation/schema";

export default function EditTrainerForm() {
  const params = useParams();
  const { data, isLoading } = useGetTrainer({
    params: {
      limit: 1,
      id: params?.id,
    },
  });
  const { mutate, isLoading: isLoadingEdit } = useCreateTrainer();
  const [image, setImage] = useState("");
  const queryClient = useQueryClient();

  const { control, handleSubmit, setValue, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      full_name: "",
      email: "",
      job: "",
      instance: "",
      phone: "",
      about_trainer: "",
      linkedin_url: "",
      profile_photo: null,
    },
    resolver: yupResolver(trainerFormSchema),
  });

  useEffect(() => {
    if (data?.data?.length > 0) {
      const trainerData = data?.data[0];
      reset({
        full_name: trainerData.full_name || "",
        email: trainerData.email || "",
        job: trainerData.job || "",
        instance: trainerData.instance || "",
        phone: trainerData.phone || "",
        about_trainer: trainerData.about_trainer || "",
        linkedin_url: trainerData.linkedin_url || "",
        profile_photo: null,
      });
      setImage(trainerData.profile_url || "");
    }
  }, [data, reset]);

  const onSubmit = (formData) => {
    mutate(formData, {
      onSuccess: (res) => {
        toast.success("Berhasil menambahkan trainer");
        queryClient.invalidateQueries([queryClientKeys.GET_INTERNAL_TRAINER]);
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
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div>
              <Avatar size="lg" className="w-20 h-20" radius="md" src={image} />
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
                label="Pekerjaan atau Keahlian"
                placeholder="cth. Kepala Teknisi"
                name="job"
                control={control}
                labelPlacement="outside"
              />

              <InputForm
                label="Perusahaan"
                placeholder="cth. PT. ABC"
                name="instance"
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
                name="about_trainer"
                control={control}
                labelPlacement="outside"
              />

              <InputForm
                label="LinkedIn Link"
                placeholder="cth. https://www.linkedin.com/in/rizal-candra/"
                name="linkedin_url"
                control={control}
                labelPlacement="outside"
              />

              <div className="flex items-center mt-2 justify-end gap-2">
                <Button color="primary" variant="light">
                  Batalkan
                </Button>
                <Button
                  className="w-36"
                  isLoading={isLoadingEdit}
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
