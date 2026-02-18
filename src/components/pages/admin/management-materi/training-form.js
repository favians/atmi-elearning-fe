import InputForm from "@/components/form/input-form";
import { Button } from "@heroui/button";
import React from "react";
import { useFieldArray } from "react-hook-form";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { FaCirclePlus } from "react-icons/fa6";
import { TopicForm } from "./topic-form";
export const TrainingForm = (props) => {
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
          className="w-full border rounded-xl p-4 flex flex-col gap-4"
        >
          {/* Header Modul */}
          <div className="w-full flex items-end gap-2">
            <div className="flex-1">
              <InputForm
                label="Judul Modul"
                placeholder={`cth. Bagian ${index + 1}: Modul`}
                name={`${name}.${index}.title`}
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

          {/* Topic */}
          <div className="w-full border rounded-lg p-4 flex flex-col gap-4">
            <TopicForm name={`${name}.${index}.topics`} control={control} />
          </div>
        </div>
      ))}

      {/* Button add */}
      <Button
        color="secondary"
        startContent={<FaCirclePlus />}
        fullWidth
        className="mt-2"
        variant="bordered"
        onPress={() =>
          append({
            title: "",
            topics: [
              {
                topic_title: "",
                training_file: null,
                summary: "",
                learning_material_file: null,
              },
            ],
          })
        }
      >
        Tambahkan Modul
      </Button>
    </div>
  );
};
