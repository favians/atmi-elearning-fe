import InputForm from "@/components/form/input-form";
import TextAreaForm from "@/components/form/textarea-form";
import UploadForm from "@/components/form/upload-form";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import React from "react";
import { useFieldArray } from "react-hook-form";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { FaCirclePlus } from "react-icons/fa6";
export const TopicForm = (props) => {
  const { name, control } = props;

  const { fields, append, remove } = useFieldArray({
    control,
    name: name,
  });

  return (
    <div className="w-full flex flex-col gap-4">
      {fields.map((item, index) => (
        <div
          key={item.id}
          className="w-full border rounded-lg p-4 flex flex-col gap-4 bg-white"
        >
          {/* Header Topik */}
          <div className="flex w-full items-end gap-2">
            <div className="flex-1">
              <InputForm
                label="Judul Topik"
                placeholder={`cth. Bagian ${index + 1}: Topik`}
                name={`${name}.${index}.topic_title`}
                control={control}
                labelPlacement="outside"
                isRequired
                fullWidth
                classNames={{
                  base: "w-full",
                }}
              />
            </div>

            {index > 0 && (
              <AiOutlineMinusCircle
                size={26}
                className="mb-2 cursor-pointer text-red-500 shrink-0"
                onClick={() => remove(index)}
              />
            )}
          </div>

          {/* Upload Materi */}
          <div className="w-full">
            <UploadForm
              label="Upload Materi"
              name={`${name}.${index}.training_file`}
              control={control}
              isRequired
              description="File yang didukung PDF, Video"
              labelPlacement="outside"
              accept="video/*, application/pdf"
              fullWidth
            />
          </div>

          {/* Summary */}
          <div className="w-full">
            <TextAreaForm
              label="Summary"
              placeholder="cth. Tulis deskripsi lengkap disini"
              name={`${name}.${index}.summary`}
              control={control}
              isRequired
              labelPlacement="outside"
              classNames={{
                base: "w-full",
              }}
            />
          </div>

          {/* Upload Learning Material */}
          <div className="w-full">
            <UploadForm
              label="Upload Learning Material"
              name={`${name}.${index}.learning_material_file`}
              control={control}
              isRequired
              description="File yang didukung PDF, PPT, PNG, JPG & JPEG"
              labelPlacement="outside"
              accept="application/pdf, image/*, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation"
              fullWidth
            />
          </div>
        </div>
      ))}

      {/* Button tambah topic */}
      <Button
        color="secondary"
        startContent={<FaCirclePlus />}
        fullWidth
        variant="bordered"
        onPress={() =>
          append({
            topic_title: "",
            training_file: null,
            summary: "",
            learning_material_file: null,
          })
        }
      >
        Tambahkan Topik
      </Button>
    </div>
  );
};
