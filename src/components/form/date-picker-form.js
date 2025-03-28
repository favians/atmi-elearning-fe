import { DatePicker } from "@heroui/date-picker";
import { Controller } from "react-hook-form";

export default function DatePickerForm(props) {
  const { control, name, isDark } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <DatePicker
          variant="bordered"
          classNames={{
            label: "mb-0",
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
