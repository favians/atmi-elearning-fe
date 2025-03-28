import { Input } from "@heroui/input";
import { Controller } from "react-hook-form";
import React from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
export default function InputPasswordForm(props) {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const { control, name } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Input
          variant="bordered"
          classNames={{
            label: "mb-0",
            input: "placeholder:text-grey",
          }}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
              aria-label="toggle password visibility"
            >
              {isVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </button>
          }
          type={isVisible ? "text" : "password"}
          isInvalid={fieldState.invalid}
          errorMessage={fieldState.invalid && fieldState.error?.message}
          {...props}
          {...field}
        />
      )}
    />
  );
}
