import { Select, SelectItem } from "@heroui/select";
import { Controller } from "react-hook-form";

export default function SelectForm(props) {
  const { control, name, data, isDark } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Select
          variant="bordered"
          items={data}
          classNames={{
            label: "mb-0",
            input: ["placeholder:text-grey", isDark ? "text-white" : ""],
          }}
          isInvalid={fieldState.invalid}
          errorMessage={fieldState.invalid && fieldState.error?.message}
          {...props}
          {...field}
        >
          {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
        </Select>
      )}
    />
  );
}
