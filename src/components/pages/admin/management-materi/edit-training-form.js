import InputForm from "@/components/form/input-form";
import { Button } from "@heroui/button";
import React, { useEffect } from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { FaCirclePlus } from "react-icons/fa6";
import { EditTopicForm } from "./edit-topic-form";

export const EditTrainingForm = (props) => {
  const { name, control, step, handleStep, formState, isLoading } = props;

  const { fields, append, remove } = useFieldArray({
    control,
    name: name,
  });

  const moduleValues = useWatch({ control, name }) || [];

  const handleAddModule = () => {
    const ids = moduleValues
      .map((m) => Number(m?.id))
      .filter((id) => Number.isFinite(id) && id > 0);
    const nextId = ids.length ? Math.max(...ids) + 1 : 1;

    append({
      id: nextId,
      title: "",
      topics: [
        {
          id: 1,
          topic_title: "",
          training_file: null,
          summary: "",
          learning_material_file: null,
        },
      ],
    });
  };

  const handleBack = () => {
    handleStep(0);
  };
  useEffect(() => {
    console.log("isValid:", formState.isValid);
  }, [formState.isValid]);
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
            <EditTopicForm name={`${name}.${index}.topics`} control={control} />
          </div>
        </div>
      ))}

      {/* Button add module */}
      <Button
        color="secondary"
        startContent={<FaCirclePlus />}
        fullWidth
        className="mt-2"
        variant="bordered"
        onPress={handleAddModule}
      >
        Tambahkan Modul
      </Button>

      {/* Step Navigation */}
      <div className="flex justify-end gap-2 mt-6">
        <Button color="primary" variant="light" onPress={handleBack}>
          Kembali
        </Button>

        <Button
          type="submit"
          color="primary"
          className="w-36"
          isDisabled={!formState.isValid}
          isLoading={isLoading}
        >
          Simpan
        </Button>
      </div>
    </div>
  );
};
