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
    <ul className="flex flex-col gap-4">
      {fields.map((item, index) => (
        <li key={item.id}>
          <div className="flex gap-2 justify-center items-center">
            <InputForm
              label="Judul Modul"
              placeholder={`cth. Bagian ${index + 1}: Modul `}
              name={`${name}.${index}.title`}
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
          <div className="ml-4 mt-4">
            <TopicForm name={`${name}.${index}.topics`} control={control} />
          </div>
        </li>
      ))}
      <Button
        color="secondary"
        startContent={<FaCirclePlus />}
        fullWidth
        className="mt-2"
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
        variant="bordered"
      >
        Tambahkan Modul
      </Button>
    </ul>
  );
};
