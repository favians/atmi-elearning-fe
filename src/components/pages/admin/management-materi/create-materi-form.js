"use client";
import InputForm from "@/components/form/input-form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import SelectForm from "@/components/form/select-form";
import UploadForm from "@/components/form/upload-form";
import TextAreaForm from "@/components/form/textarea-form";
import UploadDragForm from "@/components/form/upload-drag-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getValidationSchemaByStep } from "./lib/createMateriValidation";
import { useState } from "react";
import { TrainingForm } from "./training-form";
import { useQueryClient } from "@tanstack/react-query";
import { useUploadProgress } from "@/context/upload-context";
import { queryClientKeys } from "@/constants/query-client-keys";
import toast from "react-hot-toast";
import { trainingAdminService } from "@/services/admin/trainingAdminService";

export default function CreateMateriForm({ step, handleStep }) {
  const router = useRouter();

  const [image, setImage] = useState(null);
  const schema = getValidationSchemaByStep(step);
  const [isLoading, setIsLoading] = useState(false);
  const { setProgress } = useUploadProgress();

  const queryClient = useQueryClient();
  const { control, handleSubmit, formState } = useForm({
    mode: "onChange",
    defaultValues: {
      module: [
        {
          title: "Modul 1",
          topics: [
            {
              topic_title: "",
              training_file: null,
              summary: "",
              learning_material_file: null,
            },
          ],
        },
      ],
    },

    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const payload = flattenCreateMateriFormValues(data);

    setIsLoading(true);
    trainingAdminService
      .createTraining({
        ...payload,
        onProgress: setProgress,
      })
      .then(() => {
        toast.success("Berhasil membuat pelatihan");
        queryClient.invalidateQueries([queryClientKeys.GET_INTERNAL_MATERIAL]);
      })
      .catch((err) => {
        toast.error(err?.message);
      })
      .finally(() => {
        setProgress(0);
        setIsLoading(false);
      });
  };

  function flattenCreateMateriFormValues(values) {
    const flat = {};

    // Salin field di luar "module"
    for (const key in values) {
      if (key !== "module") {
        flat[key] = values[key];
      }
    }

    // Flatten module
    values.module?.forEach((mod, modIdx) => {
      flat[`module[${modIdx}]`] = mod.title;

      mod.topics?.forEach((topic, topicIdx) => {
        flat[`module[${modIdx}].topic_title[${topicIdx}]`] = topic.topic_title;
        flat[`module[${modIdx}].training_file[${topicIdx}]`] =
          topic.training_file;
        flat[`module[${modIdx}].summary[${topicIdx}]`] = topic.summary;
        flat[`module[${modIdx}].learning_material_file[${topicIdx}]`] =
          topic.learning_material_file;
      });
    });

    return flat;
  }

  const handleBack = () => {
    step === 0 ? router.push("/admin/management-materi") : handleStep(0);
  };
  const handleNext = () => {
    handleStep(1);
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
            {step === 0 ? (
              <>
                <UploadDragForm
                  name="image_cover_file"
                  control={control}
                  accept="image/*"
                  image={image}
                  setImage={setImage}
                />
                <InputForm
                  label="Nama Pelatihan"
                  placeholder="cth. Pelatihan 1"
                  name="title"
                  control={control}
                  labelPlacement="outside"
                  isRequired
                />

                <SelectForm
                  label="Kelompok Pelatihan"
                  placeholder="Pilih kelompok pelatihan"
                  name="topic_id"
                  control={control}
                  data={animals}
                  labelPlacement="outside"
                  isRequired
                />

                <SelectForm
                  label="Badge (Opsional)"
                  placeholder="Pilih badge"
                  name="badge_tagging"
                  control={control}
                  data={animals}
                  labelPlacement="outside"
                />

                <TextAreaForm
                  label="Deskripsi Pendek"
                  placeholder="cth. Tulis deskripsi singkat disini"
                  name="small_description"
                  control={control}
                  labelPlacement="outside"
                />
                <TextAreaForm
                  label="Deskripsi Lengkap"
                  placeholder="cth. Tulis deskripsi lengkap disini"
                  name="long_description"
                  control={control}
                  labelPlacement="outside"
                />

                <InputForm
                  label="Harga"
                  placeholder="cth. 50.000"
                  name="price"
                  isRequired
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
                  name="discount_percentage"
                  endContent={
                    <div className="bg-grey-400 p-1 rounded-lg px-2 font-semibold -mr-2.5">
                      %
                    </div>
                  }
                  description="Tulis diskon dalam angka"
                  control={control}
                  labelPlacement="outside"
                />

                <SelectForm
                  label="Trainer"
                  placeholder="Pilih trainer"
                  name="trainer_id"
                  control={control}
                  data={animals}
                  isRequired
                  labelPlacement="outside"
                />

                <UploadForm
                  label="Rundown Pelatihan"
                  placeholder="Upload dokumen rundown"
                  name="rundown_file"
                  control={control}
                  isRequired
                  description="File yang didukung PDF"
                  labelPlacement="outside"
                  accept="application/pdf"
                />
              </>
            ) : (
              <>
                <TrainingForm control={control} name="module" />
              </>
            )}

            <div className="flex items-center mt-2 mb-10 justify-end gap-2">
              <Button color="primary" variant="light" onPress={handleBack}>
                Batalkan
              </Button>

              {step === 0 ? (
                <Button
                  className="w-36"
                  isDisabled={!formState.isValid}
                  onPress={handleNext}
                  color="primary"
                >
                  Selanjutnya
                </Button>
              ) : (
                <Button
                  isDisabled={!formState.isValid}
                  className="w-36"
                  type="submit"
                  color="primary"
                  isLoading={isLoading}
                >
                  Simpan
                </Button>
              )}
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
