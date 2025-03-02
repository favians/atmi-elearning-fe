import { Input } from "@heroui/input";
import { Controller } from "react-hook-form";

export default function InputForm(props) {
  const { control, name, isDark } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Input
          variant="bordered"
          classNames={{
            inputWrapper: ["min-h-14"],
            label: "mb-0.5",
            input: ["placeholder:text-grey", isDark ? "text-white" : ""],
          }}
          isInvalid={fieldState.invalid}
          errorMessage={fieldState.invalid && fieldState.error?.message}
          {...props}
          {...field}
        />
      )}
    />
  );
}
