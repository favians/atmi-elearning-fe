"use client";

import { useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { queryClientKeys } from "@/constants/query-client-keys";
import { useGetQustionnaireTemplate } from "@/hooks/admin/useGetQustionnaireTemplate";
import useUpdatetQustionnaireTemplate from "@/hooks/admin/useUpdatetQustionnaireTemplate";
import { questionnaireFormSchema } from "@/components/pages/admin/questionnaire/validation/schema";
import { Button } from "@heroui/button";
import InputForm from "@/components/form/input-form";
import toast from "react-hot-toast";
import { QuestionerForm } from "@/components/pages/admin/questionnaire/questioner-form";
import { headline, subtitle } from "@/components/primitives";

export default function EditQuestionnaireTemplateForm() {
  const router = useRouter();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data, isLoading } = useGetQustionnaireTemplate({
    params: { id: id, page: 0 },
  });
  const template = data?.data?.[0];
  const { mutate, isPending } = useUpdatetQustionnaireTemplate(id);
  console.log(data);
  const defaultValues = useMemo(() => {
    if (!template) return null;

    return {
      name: template.name || "",
      description: template.description || "",
      questioner: Array.isArray(template.form_data)
        ? template.form_data.map((item) => ({
            title: item.title || "",
            description: item.description || "",
            question: item.question || "",
            type: item.type || "TEXT",
            is_required: Boolean(item.is_required),

            // API TIDAK PUNYA MIN
            min_range_scale: "1",
            max_range_scale: String(item.max_range_scale || "1"),

            scale_labels: {
              min: item?.options[0]?.min_range_scale_label,
              max: item?.options[0]?.max_range_scale_label,
            },

            options:
              item.type === "OPTION"
                ? item.options.map((opt) => ({ title: opt }))
                : [{ title: "" }],
          }))
        : [],
    };
  }, [template]);

  const { control, handleSubmit, reset } = useForm({
    mode: "onChange",
    resolver: yupResolver(questionnaireFormSchema),
    defaultValues: {
      name: "",
      description: "",
      questioner: [],
    },
  });
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);
  // 🔄 inject data ke form
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const onSubmit = (form) => {
    const payload = {
      finder: {
        id: Number(id), // ⬅️ dari useParams()
      },
      updater: {
        name: form.name,
        description: form.description,
        form_data: form.questioner.map((item) => {
          const isLinearScale = item.type === "LINEAR_SCALE";
          const isOption = item.type === "OPTION";
          const minLabel = item.scale_labels?.min?.trim() || "";
          const maxLabel = item.scale_labels?.max?.trim() || "";
          return {
            type: item.type,
            title: item.title || "",
            question: item.question || "",
            description: item.description || "",
            is_required: Boolean(item.is_required),
            max_range_scale: isLinearScale
              ? Number(item.max_range_scale || 0)
              : 0,
            options: isLinearScale
              ? [
                  {
                    min_range_scale_label: minLabel,
                    max_range_scale_label: maxLabel,
                  },
                ]
              : isOption
                ? item.options.map((opt) => opt.title?.trim()).filter(Boolean)
                : [],
          };
        }),
      },
    };

    console.log("UPDATE PAYLOAD:", payload);

    mutate(payload, {
      onSuccess: () => {
        toast.success("Template berhasil diperbarui");
        queryClient.invalidateQueries([queryClientKeys.GET_QUESTIONNAIRE_LIST]);
        router.back();
      },
      onError: (err) => {
        toast.error(err?.message || "Gagal update template");
      },
    });
  };

  if (isLoading) return <div className="p-6">Memuat data...</div>;

  return (
    <div className="flex gap-2">
      <div className="p-6 w-1/2">
        <form onSubmit={handleSubmit(onSubmit)} className="gap-6 flex">
          <div className="flex flex-1 gap-2 flex-col">
            <h4 className={headline({ size: "sm" })}>Informasi Dasar</h4>
            <h4 className={subtitle({ size: "sm" })}>
              Perbarui informasi template kuesioner
            </h4>

            <InputForm
              label="Nama Template Kuesioner"
              name="name"
              control={control}
              isRequired
              labelPlacement="outside"
            />

            <InputForm
              label="Deskripsi"
              name="description"
              control={control}
              labelPlacement="outside"
            />

            <h4 className={headline({ size: "sm", class: "mt-6" })}>
              Formulir Kuesioner
            </h4>
            <h4 className={subtitle({ size: "sm" })}>
              Ubah pertanyaan sesuai kebutuhan
            </h4>

            <QuestionerForm control={control} name="questioner" />

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="light" onPress={() => router.back()}>
                Batal
              </Button>
              <Button type="submit" color="primary" isLoading={isPending}>
                Simpan Perubahan
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
