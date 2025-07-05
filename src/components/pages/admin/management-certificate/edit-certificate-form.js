"use client";
import InputForm from "@/components/form/input-form";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import toast from "react-hot-toast";
import SelectForm from "@/components/form/select-form";
import DatePickerForm from "@/components/form/date-picker-form";
import UploadForm from "@/components/form/upload-form";
import { useGetTraineeList } from "@/hooks/admin/useGetTrainee";
import { useGetTrainingList } from "@/hooks/admin/useGetTraining";
import useCreateCertificate from "@/hooks/admin/useCreateCertificate";
import { useQueryClient } from "@tanstack/react-query";
import { queryClientKeys } from "@/constants/query-client-keys";
import { yupResolver } from "@hookform/resolvers/yup";
import { certificateFormSchema } from "./validation/schema";
import { subtitle } from "@/components/primitives";
import { useEffect, useState } from "react";
import { useGetCertificate } from "@/hooks/admin/useGetCertificate";
import { Spinner } from "@heroui/spinner";
import { parseDate } from "@internationalized/date";
import { parseDateToIso } from "@/helpers/Date";

export default function EditCertificateForm() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();

  const [image, setImage] = useState("");
  const { data: dataTrainee, isLoading: isLoadingTrainee } =
    useGetTraineeList();

  const { data: dataTraining, isLoading: isLoadingTraining } =
    useGetTrainingList();

  const { mutate, isPending: isLoading } = useCreateCertificate();
  const { control, handleSubmit, reset } = useForm({
    mode: "onChange",

    resolver: yupResolver(certificateFormSchema),
  });
  const { data, isLoading: isLoadingCertificate } = useGetCertificate({
    params: {
      limit: 1,
      id: params?.id,
    },
  });

  useEffect(() => {
    if (data?.data?.length > 0) {
      const certificate = data?.data[0];
      reset({
        user_id: certificate.trainee_id || "",
        scheme_id: certificate.training_id || "",
        assign_date: parseDate(parseDateToIso(certificate?.assign_date)),
        certificate_number: certificate.certificate_number || "",
        download_url: certificate.download_url || "",
      });
      setImage(certificate.image_url || "");
    }
  }, [data, reset]);
  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        toast.success("Berhasil menambahkan cerftificate");
        queryClient.invalidateQueries([
          queryClientKeys.GET_INTERNAL_CERTIFICATE,
        ]);
        router.back();
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };

  return (
    <div className="flex gap-2">
      <div className="p-6 w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="gap-6 flex">
          {isLoadingCertificate ? (
            <Spinner />
          ) : (
            <>
              <div className="flex flex-1 gap-4 flex-col">
                <SelectForm
                  label="Nama Trainee"
                  placeholder="Pilih User"
                  name="user_id"
                  control={control}
                  data={dataTrainee || []}
                  labelPlacement="outside"
                  isLoading={isLoadingTrainee}
                />

                <SelectForm
                  label="Pelatihan"
                  placeholder="Pilih Pelatihan"
                  name="scheme_id"
                  control={control}
                  data={dataTraining || []}
                  isLoading={isLoadingTraining}
                  labelPlacement="outside"
                />

                <DatePickerForm
                  label="Tanggal Terbit"
                  placeholder="Tanggal"
                  name="assign_date"
                  control={control}
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
                  placeholder="Upload dokumen sertifikat"
                  name="certificate_file"
                  control={control}
                  isRequired
                  labelPlacement="outside"
                />

                <UploadForm
                  label="Cover Sertifikat"
                  placeholder="Upload dokumen rundown"
                  name="image_file"
                  description="File yang didukung png & jpeg (rekomendasi ukuran 920 x 525) "
                  control={control}
                  isWithPreview
                  isRequired
                  onHandleImageChange={(file) => {
                    setImage(file);
                  }}
                  onHandleDeleteImage={() => {
                    setImage("");
                  }}
                  labelPlacement="outside"
                />

                <div className="flex items-center mt-2 justify-end gap-2">
                  <Button color="primary" variant="light">
                    Batalkan
                  </Button>
                  <Button
                    isLoading={isLoading}
                    className="w-36"
                    color="primary"
                    type="submit"
                  >
                    Simpan
                  </Button>
                </div>
              </div>
              <div className="flex flex-1 flex-col px-4">
                {image && (
                  <>
                    <h4
                      className={subtitle({
                        size: "sm",
                        class: "font-semibold mb-2",
                      })}
                    >
                      Preview Cover Sertifikat
                    </h4>
                    <div className="flex ">
                      {image && (
                        <img
                          src={image}
                          alt="Preview"
                          className="aspect-[920/525] border  w-full object-cover rounded-lg"
                        />
                      )}
                    </div>
                  </>
                )}
              </div>
            </>
          )}
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
