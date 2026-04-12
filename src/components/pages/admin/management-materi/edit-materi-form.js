"use client";

import InputForm from "@/components/form/input-form";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import SelectForm from "@/components/form/select-form";
import UploadForm from "@/components/form/upload-form";
import TextAreaForm from "@/components/form/textarea-form";
import UploadDragForm from "@/components/form/upload-drag-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUploadProgress } from "@/context/upload-context";
import { queryClientKeys } from "@/constants/query-client-keys";
import toast from "react-hot-toast";
import { useGetBadgeList } from "@/hooks/admin/useGetBadge";
import { useGetTopicList } from "@/hooks/admin/useGetTopic";
import { useGetTrainerList } from "@/hooks/admin/useGetTrainerList";
import { useGetEditMaterial } from "@/hooks/admin/useGetMaterial";
import { getEditValidationSchemaByStep } from "./lib/editMateriValidation";
import { EditTrainingForm } from "./edit-training-form";
import { trainingAdminService } from "@/services/admin/trainingAdminService";

export default function EditMateriForm({ step, handleStep }) {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();

  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const schema = getEditValidationSchemaByStep(step);

  const { setProgress } = useUploadProgress();

  const { data, isLoading: isLoadMaterial } = useGetEditMaterial({
    params: {
      training_id: params?.id,
    },
  });

  const { data: dataBadge, isLoading: isLoadingBadge } = useGetBadgeList();
  const { data: dataTopic, isLoading: isLoadingTopic } = useGetTopicList();
  const { data: dataTrainer, isLoading: isLoadingTrainer } =
    useGetTrainerList();

  const { control, handleSubmit, formState, reset, setValue, trigger } =
    useForm({
      mode: "onChange",
      resolver: yupResolver(schema),
      defaultValues: {
        title: "",
        topic_id: "",
        badge_tagging: "",
        small_description: "",
        long_description: "",
        price: "",
        discount_percentage: "",
        trainer_id: "",
        rundown_file: null,
        image_cover_file: null,
        module: [
          {
            title: "",
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
    });
  const toFileObject = (url) => {
    if (!url) return null;

    const name = url.split("/").pop();

    return {
      url,
      name,
    };
  };
  function toNumber(val) {
    if (val == null || val === "") return 0;
    // buang semua selain digit
    const cleaned = String(val).replace(/[^\d]/g, "");
    return cleaned === "" ? 0 : Number(cleaned);
  }
  const normalizeNumber = (val) => {
    if (val === "-" || val === "" || val == null) return "";
    return Number(val);
  };
  useEffect(() => {
    if (!data?.data) return;

    const materi = data.data;

    const mappedModules =
      materi.modules?.map((mod) => ({
        id: mod.id,
        title: mod.title,
        topics:
          mod.material_content?.map((topic) => ({
            id: topic.id,
            topic_title: topic.topic_title,
            training_file: topic.training_file_url
              ? toFileObject(topic.training_file_url)
              : null,
            summary: topic.summary,
            learning_material_file: topic.learning_material_url
              ? toFileObject(topic.learning_material_url)
              : null,
          })) || [],
      })) || [];

    reset({
      title: materi.title,
      topic_id: String(materi.topic_id),
      badge_tagging: materi.badge_tagging || "",
      small_description: materi.small_description,
      long_description: materi.long_description,
      price: materi.price,
      discount_percentage: materi.discount_percentage,
      trainer_id: String(materi.trainer_id),
      rundown_file: toFileObject(materi.rundown_file),
      module: mappedModules, // 🔥 penting
    });

    if (materi.image_url) {
      setImage(materi.image_url);

      setValue(
        "image_cover_file",
        {
          url: materi.image_url,
          name: "image_cover",
        },
        { shouldDirty: true },
      );
    }
  }, [data, reset]);

  const onSubmit = (values) => {
    const { image_cover_file, rundown_file, ...rest } = values;

    const payload = {
      ...flattenEditMateriFormValues({
        ...rest,
        price: toNumber(values.price),
        discount_percentage:
          values.discount_percentage === "" ||
          values.discount_percentage == null
            ? 0
            : toNumber(values.discount_percentage),
      }),
      ...resolveFileField(image_cover_file, "image_cover_file"),
      ...resolveFileField(rundown_file, "rundown_file"),
    };

    setIsLoading(true);
    console.log("PAYLOAD:", JSON.stringify(payload, null, 2));

    trainingAdminService
      .updateTraining({
        id: Number(params?.id),
        ...payload,
        onProgress: setProgress,
      })
      .then(() => {
        toast.success("Berhasil mengupdate pelatihan");

        queryClient.invalidateQueries([queryClientKeys.GET_INTERNAL_MATERIAL]);

        router.back();
      })
      .catch((err) => {
        toast.error(err?.message || "Terjadi kesalahan");
      })
      .finally(() => {
        setProgress(0);
        setIsLoading(false);
      });
  };

  const SPECIAL_FILE_FIELDS = {
    image_cover_file: "image_url",
  };

  function resolveFileField(value, fieldName) {
    if (!value) return {};

    // 🔥 upload file baru
    if (value instanceof File) {
      return { [fieldName]: value };
    }

    if (value?.url) {
      // 🔥 special root field
      if (SPECIAL_FILE_FIELDS[fieldName]) {
        return {
          [SPECIAL_FILE_FIELDS[fieldName]]: String(value.url),
        };
      }

      // 🔥 khusus learning_material_file & training_file (nested)
      if (fieldName.includes("learning_material_file")) {
        const urlFieldName = fieldName.replace("_file", "_url");

        return {
          [urlFieldName]: String(value.url),
        };
      }

      // 🔥 default fallback
      const urlFieldName = fieldName.replace("_file", "_file_url");

      return {
        [urlFieldName]: String(value.url),
      };
    }

    return {};
  }
  function flattenEditMateriFormValues(values) {
    const flat = {};

    for (const key in values) {
      if (key !== "module") {
        flat[key] = values[key];
      }
    }

    values.module?.forEach((mod, modIdx) => {
      // 🔥 module id
      if (mod.id) {
        flat[`module[${modIdx}].id`] = Number(mod.id);
      }

      flat[`module[${modIdx}].title`] = mod.title;

      mod.topics?.forEach((topic, topicIdx) => {
        // 🔥 topic id
        if (topic.id) {
          flat[`module[${modIdx}].material_id[${topicIdx}]`] = Number(topic.id);
        }

        flat[`module[${modIdx}].topic_title[${topicIdx}]`] = topic.topic_title;

        flat[`module[${modIdx}].summary[${topicIdx}]`] = topic.summary;

        // file handling
        Object.assign(
          flat,
          resolveFileField(
            topic.training_file,
            `module[${modIdx}].training_file[${topicIdx}]`,
          ),
        );

        Object.assign(
          flat,
          resolveFileField(
            topic.learning_material_file,
            `module[${modIdx}].learning_material_file[${topicIdx}]`,
          ),
        );
      });
    });

    return flat;
  }

  const handleBack = () => {
    step === 0 ? router.push("/admin/management-materi") : handleStep(0);
  };

  const handleNext = async () => {
    const isValid = await trigger();
    if (!isValid) return;

    handleStep(1);
  };

  if (isLoadMaterial) {
    return <div className="flex justify-center p-10">Loading...</div>;
  }

  return (
    <div className="flex gap-2">
      <div className="p-6 w-1/2">
        <form onSubmit={(e) => e.preventDefault()} className="gap-6 flex">
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
                  data={dataTopic || []}
                  isLoading={isLoadingTopic}
                  labelPlacement="outside"
                  isRequired
                />

                <SelectForm
                  label="Badge (Opsional)"
                  placeholder="Pilih badge"
                  name="badge_tagging"
                  control={control}
                  data={dataBadge || []}
                  isLoading={isLoadingBadge}
                  labelPlacement="outside"
                />

                <TextAreaForm
                  label="Deskripsi Pendek"
                  placeholder="cth. Tulis deskripsi singkat disini"
                  name="small_description"
                  control={control}
                  labelPlacement="outside"
                  maxLength={225}
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
                  isCurrency
                  control={control}
                  labelPlacement="outside"
                />

                <InputForm
                  label="Tambahkan Diskon"
                  placeholder="cth. 20"
                  name="discount_percentage"
                  description="Tulis diskon dalam angka"
                  control={control}
                  labelPlacement="outside"
                />

                <SelectForm
                  label="Trainer"
                  placeholder="Pilih trainer"
                  name="trainer_id"
                  control={control}
                  data={dataTrainer || []}
                  isLoading={isLoadingTrainer}
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
              <EditTrainingForm
                control={control}
                name="module"
                step={step}
                handleStep={handleStep}
                formState={formState}
              />
            )}

            <div className="flex items-center mt-2 mb-10 justify-end gap-2">
              <Button color="primary" variant="light" onPress={handleBack}>
                Batalkan
              </Button>

              {step === 0 ? (
                <Button
                  type="button"
                  className="w-36"
                  isDisabled={!formState.isValid}
                  onPress={handleNext}
                  color="primary"
                >
                  Selanjutnya
                </Button>
              ) : (
                <Button
                  className="w-36"
                  type="button"
                  color="primary"
                  isDisabled={!formState.isValid}
                  isLoading={isLoading}
                  onPress={handleSubmit(onSubmit)}
                >
                  Simpan
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
