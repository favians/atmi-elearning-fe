"use client";

import InputForm from "@/components/form/input-form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { queryClientKeys } from "@/constants/query-client-keys";
import { yupResolver } from "@hookform/resolvers/yup";
import { questionnaireFormSchema } from "./validation/schema";
import { headline, subtitle } from "@/components/primitives";
import { QuestionerForm } from "./questioner-form";
import useCreateTamplateQuestionnaire from "@/hooks/admin/useCreateTamplateQuestionnaire";

export default function CreateQuestionnaireForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending: isLoading } = useCreateTamplateQuestionnaire();

  const { control, handleSubmit } = useForm({
    mode: "onChange",
    resolver: yupResolver(questionnaireFormSchema),
    defaultValues: {
      name: "",
      description: "",
      questioner: [
        {
          type: "TEXT",
          title: "",
          description: "",
          question: "",
          is_required: false,
          max_range_scale: "5",
          min_range_scale: "1",
          options: [{ title: "" }],
        },
      ],
    },
  });

  // 🔒 helper biar numeric selalu aman
  const sanitizeNumber = (value) => {
    if (typeof value === "number") return value;
    if (typeof value !== "string") return 0;

    // buang semua selain angka
    const cleaned = value.replace(/[^\d]/g, "");
    const n = Number(cleaned);

    return Number.isFinite(n) ? n : 0;
  };

  const onSubmit = (data) => {
    const payload = {
      name: data.name,
      description: data.description,
      form_data: data.questioner.map((item) => {
        const isLinearScale = item.type === "LINEAR_SCALE";
        const isOption = item.type === "OPTION";

        const minLabel = item.scale_labels?.min?.trim() || "";
        const maxLabel = item.scale_labels?.max?.trim() || "";

        return {
          type: item.type,
          title: item.title || "",
          description: item.description || "",
          question: item.question || "",
          is_required: Boolean(item.is_required),

          max_range_scale: isLinearScale
            ? sanitizeNumber(item.max_range_scale)
            : 0,

          min_range_scale_label: isLinearScale ? minLabel : "",
          max_range_scale_label: isLinearScale ? maxLabel : "",

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
    };

    // 🔍 DEBUG (hapus kalau sudah yakin)
    console.log("FINAL PAYLOAD:");
    console.log(JSON.stringify(payload, null, 2));

    mutate(payload, {
      onSuccess: () => {
        toast.success("Berhasil menambahkan Template Questionnaire");
        queryClient.invalidateQueries([queryClientKeys.GET_QUESTIONNAIRE_LIST]);
        router.back();
      },
      onError: (error) => {
        toast.error(error?.message || "Terjadi kesalahan");
      },
    });
  };

  return (
    <div className="flex gap-2">
      <div className="p-6 w-1/2">
        <form onSubmit={handleSubmit(onSubmit)} className="gap-6 flex">
          <div className="flex flex-1 gap-2 flex-col">
            <h4
              className={headline({
                size: "sm",
                class: "leading-[10px]",
              })}
            >
              Informasi Dasar
            </h4>
            <h4
              className={subtitle({
                size: "sm",
                class: "mb-3",
              })}
            >
              Masukkan informasi dasar kuesioner Anda.
            </h4>

            <InputForm
              label="Nama Template Kuesioner"
              placeholder="Tulis nama template"
              name="name"
              control={control}
              isRequired
              labelPlacement="outside"
            />

            <InputForm
              label="Deskripsi (opsional)"
              placeholder="Buat deskripsi singkat tentang template ini"
              name="description"
              control={control}
              labelPlacement="outside"
            />

            <h4
              className={headline({
                size: "sm",
                class: "leading-[10px] mt-6",
              })}
            >
              Buat Formulir Kuesioner
            </h4>
            <h4
              className={subtitle({
                size: "sm",
                class: "mb-3",
              })}
            >
              Buat dan ubah formulir Anda untuk memenuhi kebutuhan Anda.
            </h4>

            <QuestionerForm control={control} name="questioner" />

            <div className="flex items-center mt-2 justify-end gap-2">
              <Button
                color="primary"
                onPress={() => router.back()}
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
        </form>
      </div>
      {/* <div className="border-1 m-4 p-4 flex flex-1 flex-col rounded-lg border-gray-200 ">
        <h3 className={headline({ size: "sm" })}>Izin yang diberikan</h3>
        <h4 className={subtitle({ size: "sm" })}>
          Admin bisa melihat dan edit modul yang diizinkan
        </h4>

        <div className="flex items-center mt-4 mb-4 justify-between">
          <Checkbox defaultSelected>Pilih Semua</Checkbox>
          <h4
            className={subtitle({
              size: "sm",
              color: "primary",
              class: "cursor-pointer",
            })}
          >
            Hapus Semua
          </h4>
        </div>

        <Accordion
          itemClasses={{
            base: "-mx-2 mb-2",
            indicator: "!rotate-0",
            title: "font-semibold",
          }}
        >
          <AccordionItem
            key="1"
            aria-label="Accordion 1"
            title="Manajemen Materi"
            indicator={({ isOpen }) => (isOpen ? <FiMinus /> : <FiPlus />)}
          >
            <div className="grid grid-cols-2 gap-4">
              <Checkbox>Buat Materi Baru</Checkbox>
              <Checkbox>Edit Materi</Checkbox>
              <Checkbox>Hapus Materi</Checkbox>
              <Checkbox>Lihat Materi</Checkbox>
            </div>
          </AccordionItem>
        </Accordion>
        <Divider className="my-2" />
        <Accordion
          itemClasses={{
            base: "-mx-2 mb-2",
            indicator: "!rotate-0",
            title: "font-semibold",
          }}
        >
          <AccordionItem
            key="1"
            aria-label="Accordion 1"
            title="Manajemen User"
            indicator={({ isOpen }) => (isOpen ? <FiMinus /> : <FiPlus />)}
          >
            <div className="grid grid-cols-2 gap-4">
              <Checkbox>Verifikasi User</Checkbox>
              <Checkbox>Edit User</Checkbox>
              <Checkbox>Hapus User</Checkbox>
              <Checkbox>Lihat User</Checkbox>
            </div>
          </AccordionItem>
        </Accordion>
      </div> */}
    </div>
  );
}
