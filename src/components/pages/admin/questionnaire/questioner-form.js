"use client";

import InputForm from "@/components/form/input-form";
import SelectForm from "@/components/form/select-form";
import SwitchForm from "@/components/form/switch-form";
import TextAreaForm from "@/components/form/textarea-form";
import { Button } from "@heroui/button";
import React, { useEffect } from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import { FaCirclePlus } from "react-icons/fa6";
import { OptionsForm } from "./options-form";
import { subtitle } from "@/components/primitives";
import { CopyDocument } from "@/assets/icons/general/copyDocument";
import { Delete } from "@/assets/icons/general/delete";

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

export const QuestionerForm = ({ name, control }) => {
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name,
  });

  /**
   * WATCH ALL QUESTIONS
   */
  const watchedQuestions =
    useWatch({
      control,
      name,
    }) || [];

  /**
   * CHECK TITLE EXISTS
   */
  const hasTitle = watchedQuestions.some((q) => q?.type === "TITLE");
  useEffect(() => {
    if (fields.length === 0) {
      replace([
        {
          title: "",
          description: "",
          type: "TITLE",
          question: "",
          is_required: false,
          min_range_scale: "1",
          max_range_scale: "1",
          scale_labels: {
            min: "",
            max: "",
          },
          options: [{ title: "" }],
        },
      ]);
    }
  }, [fields.length, replace]);

  /**
   * TYPE OPTIONS
   */
  const getTypeData = (currentIndex) => {
    const currentType = watchedQuestions[currentIndex]?.type;

    const baseOptions = [
      { key: "TEXT", label: "Text" },
      { key: "LINEAR_SCALE", label: "Linear Scale" },
      { key: "OPTION", label: "Option" },
    ];

    // kalau belum ada TITLE → TITLE di paling atas
    if (!hasTitle) {
      return [{ key: "TITLE", label: "Title" }, ...baseOptions];
    }

    // kalau ini item yang sudah TITLE → tetap tampilkan TITLE di atas
    if (currentType === "TITLE") {
      return [{ key: "TITLE", label: "Title" }, ...baseOptions];
    }

    // kalau sudah ada TITLE dan ini bukan TITLE → jangan tampilkan TITLE
    return baseOptions;
  };

  /**
   * DUPLICATE
   */
  const handleDuplicate = (index) => {
    const source = watchedQuestions[index];
    if (!source) return;

    // prevent duplicate TITLE
    if (source.type === "TITLE" && hasTitle) {
      alert("Title hanya boleh satu");
      return;
    }

    append({
      ...source,
      options: source.options ? source.options.map((opt) => ({ ...opt })) : [],
    });
  };

  /**
   * DELETE
   */
  const handleDelete = (index) => {
    remove(index);
  };

  /**
   * ADD NEW QUESTION
   */
  const handleAdd = () => {
    append({
      title: "",
      description: "",
      type: hasTitle ? "TEXT" : "TITLE",
      question: "",
      is_required: false,
      min_range_scale: "1",
      max_range_scale: "1",
      scale_labels: {
        min: "",
        max: "",
      },
      options: [{ title: "" }],
    });
  };

  return (
    <ul className="flex flex-col gap-4">
      {fields.map((item, index) => {
        const typeValue = watchedQuestions[index]?.type;

        const minScale = watchedQuestions[index]?.min_range_scale ?? 1;

        const maxScale = watchedQuestions[index]?.max_range_scale;

        return (
          <li
            key={item.id}
            className="bg-[#F8F9FB] p-4 rounded-md shadow-md border border-grey-400"
          >
            <div className="flex flex-col gap-3">
              {/* QUESTION + TYPE */}
              <div className="flex gap-2 w-full">
                <div className="flex-1">
                  <InputForm
                    placeholder="Question"
                    name={`${name}.${index}.title`}
                    control={control}
                    bgWhite
                  />
                </div>

                <div className="w-44">
                  <SelectForm
                    bgWhite
                    name={`${name}.${index}.type`}
                    control={control}
                    data={getTypeData(index)}
                  />
                </div>
              </div>

              {/* DESCRIPTION */}
              <TextAreaForm
                placeholder="Description (optional)"
                name={`${name}.${index}.description`}
                control={control}
                bgWhite
              />

              {/* OPTION TYPE */}
              {typeValue === "OPTION" && (
                <OptionsForm
                  name={`${name}.${index}.options`}
                  control={control}
                />
              )}

              {/* LINEAR SCALE */}
              {typeValue === "LINEAR_SCALE" && (
                <div className="flex flex-col gap-3">
                  {/* SCALE SELECT */}
                  <div className="flex items-center gap-6">
                    <div className="w-20">
                      <SelectForm
                        bgWhite
                        control={control}
                        data={[{ key: "1", label: "1" }]}
                        isDisabled
                        name={`${name}.${index}.min_range_scale`}
                      />
                    </div>

                    <h4 className={subtitle({})}>to</h4>

                    <div className="w-20">
                      <SelectForm
                        bgWhite
                        name={`${name}.${index}.max_range_scale`}
                        control={control}
                        data={rangeData}
                      />
                    </div>
                  </div>

                  {/* MIN LABEL */}
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
                  />

                  {/* MAX LABEL */}
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
                  />
                </div>
              )}

              {/* FOOTER */}
              <div className="flex justify-between items-center mt-4">
                {/* REQUIRED SWITCH */}
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

                {/* ACTION BUTTONS */}
                <div className="flex items-center gap-1">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={() => handleDuplicate(index)}
                  >
                    <CopyDocument />
                  </Button>

                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
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

      {/* ADD BUTTON */}
      <Button
        color="primary"
        startContent={<FaCirclePlus />}
        fullWidth
        onPress={handleAdd}
        variant="bordered"
      >
        Tambahkan Pertanyaan
      </Button>
    </ul>
  );
};
