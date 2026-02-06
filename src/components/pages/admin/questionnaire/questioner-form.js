import InputForm from "@/components/form/input-form";
import SelectForm from "@/components/form/select-form";
import SwitchForm from "@/components/form/switch-form";
import TextAreaForm from "@/components/form/textarea-form";
import { Button } from "@heroui/button";
import clsx from "clsx";
import React from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import { AiOutlineDelete, AiOutlineMinusCircle } from "react-icons/ai";
import { FaCirclePlus } from "react-icons/fa6";
import { OptionsForm } from "./options-form";
import { subtitle } from "@/components/primitives";
import { CopyDocument } from "@/assets/icons/general/copyDocument";
import { Delete } from "@/assets/icons/general/delete";
const typeData = [
  { key: "TEXT", label: "Text" },
  { key: "TITLE", label: "Title" },
  { key: "LINEAR_SCALE", label: "Linear Scale" },
  { key: "OPTION", label: "Option" },
];
const rangeData = [
  { key: "1", label: "1" },
  { key: "2", label: "2" },
  { key: "3", label: "3" },
  { key: "4", label: "4" },
  { key: "5", label: "5" },
  { key: "6", label: "6" },
  { key: "7", label: "7" },
  { key: "8", label: "8" },
  { key: "9", label: "9" },
  { key: "10", label: "10" },
];
const scaleLabels = {
  1: "Sangat Tidak Setuju",
  2: "Tidak Setuju",
  3: "Cukup Tidak Setuju",
  4: "Netral",
  5: "Cukup Setuju",
  6: "Setuju",
  7: "Sangat Setuju",
  8: "Sangat Setuju Sekali",
  9: "Ekstrem Setuju",
  10: "Paling Setuju",
};
export const QuestionerForm = (props) => {
  const { name, control } = props;
  const { fields, append, remove } = useFieldArray({
    control,
    name: name,
  });
  const watchedQuestions =
    useWatch({
      control,
      name,
    }) || [];
  const handleDuplicate = (index) => {
    const source = watchedQuestions[index];
    if (!source) return;

    append({
      ...source,
      // pastikan options tidak shared reference
      options: source.options ? source.options.map((opt) => ({ ...opt })) : [],
    });
  };

  const handleDelete = (index) => {
    remove(index);
  };
  return (
    <ul className="flex flex-col gap-4">
      {fields.map((item, index) => {
        // 👇 Pantau nilai type per-item
        const typeValue = watchedQuestions[index]?.type;
        const minScale = watchedQuestions[index]?.min_range_scale ?? 1;
        const maxScale = watchedQuestions[index]?.max_range_scale;
        return (
          <li
            key={item.id}
            className="bg-[#F8F9FB] p-4 rounded-md shadow-md border-1 border-grey-400"
          >
            <div className="flex flex-col gap-2 justify-center items-center">
              <div className="flex w-full gap-2 items-center">
                <div className="w-full">
                  <InputForm
                    placeholder={`Question`}
                    name={`${name}.${index}.title`}
                    control={control}
                    bgWhite
                  />
                </div>
                <div className=" w-44">
                  <SelectForm
                    bgWhite
                    name={`${name}.${index}.type`}
                    control={control}
                    data={typeData}
                  />
                </div>
              </div>

              <TextAreaForm
                placeholder="Description (optional)"
                name={`${name}.${index}.description`}
                control={control}
                bgWhite
              />

              {typeValue == "OPTION" && (
                <OptionsForm
                  name={`${name}.${index}.options`}
                  control={control}
                />
              )}

              {typeValue === "LINEAR_SCALE" && (
                <div className="flex w-full flex-col gap-3">
                  <div className="flex w-full gap-6 items-center">
                    {/* MIN */}
                    <div className="flex items-center gap-2">
                      <div className="w-20">
                        <SelectForm
                          bgWhite
                          selectedKeys={
                            fields.value ? [String(fields.value)] : []
                          }
                          control={control}
                          data={[{ key: "1", label: "1" }]}
                          isDisabled
                          name={`${name}.${index}.min_range_scale`}
                        />
                      </div>
                    </div>

                    <h4 className={subtitle({})}>to</h4>

                    {/* MAX */}
                    <div className="flex items-center gap-2">
                      <div className="w-20">
                        <SelectForm
                          bgWhite
                          selectedKeys={
                            fields.value ? [String(fields.value)] : []
                          }
                          name={`${name}.${index}.max_range_scale`}
                          control={control}
                          data={rangeData}
                        />
                      </div>
                    </div>
                  </div>
                  <InputForm
                    placeholder="Label (optional)"
                    name={`${name}.${index}.scale_labels.min`}
                    control={control}
                    bgWhite
                    startContent={
                      <span className="text-grey-700 bg-grey-300 w-8 text-center -ml-2 p-0.5 rounded-l-lg mr-1">
                        {minScale}
                      </span>
                    }
                    className="w-full"
                  />
                  <InputForm
                    placeholder="Label (optional)"
                    name={`${name}.${index}.scale_labels.max`}
                    control={control}
                    bgWhite
                    startContent={
                      <span className="text-grey-700 bg-grey-300 w-8 text-center -ml-2 p-0.5 rounded-l-lg mr-1">
                        {maxScale || "-"}
                      </span>
                    }
                    isDisabled={!maxScale}
                    className="w-full"
                  />
                </div>
              )}

              <div
                className={clsx(
                  `flex w-full mt-4 justify-between items-center`,
                )}
              >
                {/* kiri: switch */}
                {typeValue !== "TITLE" ? (
                  <SwitchForm
                    name={`${name}.${index}.is_required`}
                    control={control}
                    labelPlacement="outside"
                    labelYes="Required"
                    labelNo="No Required"
                  />
                ) : (
                  <div />
                )}

                {/* kanan: actions */}
                <div className="flex items-center">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    title="Duplicate"
                    onPress={() => handleDuplicate(index)}
                  >
                    <CopyDocument />
                  </Button>

                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    title="Delete"
                    onPress={() => handleDelete(index)}
                    isDisabled={fields.length === 1}
                  >
                    <Delete />
                  </Button>
                </div>
              </div>
            </div>
          </li>
        );
      })}
      <Button
        color="primary"
        startContent={<FaCirclePlus />}
        fullWidth
        className="mt-2"
        onPress={() =>
          append({
            title: "",
            description: "",
            type: "TEXT",
            question: "",
            is_required: false,
            min_range_scale: "1",
            max_range_scale: "1",
            scale_labels: {
              min: "",
              max: "",
            },
            options: [{ title: "" }],
          })
        }
        variant="bordered"
      >
        Tambahkan Pertanyaan
      </Button>
    </ul>
  );
};
