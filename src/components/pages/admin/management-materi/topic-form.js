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
    <ul className="flex flex-col gap-4">
      {fields.map((item, index) => (
        <li key={item.id}>
          <div className="flex flex-col gap-2 justify-center items-center">
            <div className="flex gap-2 w-full justify-center items-center">
              <InputForm
                label="Judul Topik"
                placeholder={`cth. Bagian ${index + 1}: Topik `}
                name={`${name}.${index}.topic_title`}
                control={control}
                labelPlacement="outside"
                isRequired
                classNames={{
                  base: "w-full",
                }}
              />
              {index > 0 && (
                <AiOutlineMinusCircle
                  size={24}
                  className="mt-5 cursor-pointer text-grey-900"
                  onClick={() => remove(index)}
                />
              )}
            </div>
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
            <TextAreaForm
              label="Summary"
              placeholder="cth. Tulis deskripsi lengkap disini"
              name={`${name}.${index}.summary`}
              control={control}
              isRequired
              labelPlacement="outside"
            />
            <UploadForm
              label="Upload Learning Material"
              name={`${name}.${index}.learning_material_file`}
              control={control}
              isRequired
              description="File yang didukung PDF, PPT, PNG, JPG & JPEG"
              labelPlacement="outside"
              accept="application/pdf, image/*, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation"
            />
            <Divider className="my-2" />
          </div>
        </li>
      ))}
      <Button
        color="secondary"
        startContent={<FaCirclePlus />}
        fullWidth
        className="mt-2"
        onPress={() => append({ topic_title: "" })}
        variant="bordered"
      >
        Tambahkan Topik
      </Button>
    </ul>
  );
};
