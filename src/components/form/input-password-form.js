import { Input } from "@heroui/input";
import { Controller } from "react-hook-form";
import React from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
export default function InputPasswordForm({
  control,
  name,
  label,
  required = false,
  ...rest
}) {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Input
            id={name}
            variant="bordered"
            type={isVisible ? "text" : "password"}
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            endContent={
              <button
                type="button"
                onClick={() => setIsVisible((prev) => !prev)}
              >
                {isVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </button>
            }
            {...field}
            {...rest}
          />
        )}
      />
    </div>
  );
}
