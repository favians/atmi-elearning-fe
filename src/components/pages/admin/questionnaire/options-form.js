import InputForm from "@/components/form/input-form";
import { Button } from "@heroui/button";
import clsx from "clsx";
import React from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { FaCirclePlus } from "react-icons/fa6";

const getOptionLabel = (index) => String.fromCharCode(65 + index);

export const OptionsForm = ({ name, control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  // cek apakah Other sudah ada
  const options = useWatch({ control, name });
  const hasOther = options?.some(
    (opt) => opt?.title?.toLowerCase() === "other",
  );

  return (
    <ul className="flex mt-4 w-full flex-col gap-3">
      {fields.map((item, index) => {
        const label = getOptionLabel(index);
        const isOther = item.title?.toLowerCase() === "other";

        return (
          <li key={item.id}>
            <div className="flex flex-col gap-2">
              <div className={clsx("gap-2 w-full items-center", "flex")}>
                <InputForm
                  placeholder={`Option ${label}`}
                  name={`${name}.${index}.title`}
                  control={control}
                  startContent={
                    <span className="text-grey-700 bg-grey-300 w-8 text-center -ml-2 p-0.5 rounded-l-lg mr-1">
                      {label}
                    </span>
                  }
                  optionForm
                  bgWhite
                  isRequired
                  disabled={isOther} // 🔒 Other tetap tidak bisa diedit
                />

                {/* ✅ Other sekarang BISA dihapus */}
                {index > 0 && (
                  <AiOutlineMinusCircle
                    size={24}
                    className="cursor-pointer text-grey-900"
                    onClick={() => remove(index)}
                  />
                )}
              </div>
            </div>
          </li>
        );
      })}

      {/* ACTION BUTTONS */}
      <div className="flex gap-2 mt-2 w-full">
        <div
          className="flex gap-2 justify-start items-center text-primary cursor-pointer"
          onClick={() => append({ title: "" })}
        >
          <FaCirclePlus /> Add Option
        </div>
        <div> Or </div>
        <div
          className="flex gap-2 justify-start items-center text-primary cursor-pointer"
          onClick={() => append({ title: "Other" })}
        >
          Others
        </div>
      </div>
    </ul>
  );
};
