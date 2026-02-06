import { Select, SelectItem } from "@heroui/select";
import { Controller } from "react-hook-form";

export default function SelectForm(props) {
  const { control, name, bgWhite, data, isDark } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <Select
            {...field}
            {...props}
            variant="bordered"
            aria-label={name}
            aria-labelledby={name}
            items={data}
            selectedKeys={field.value ? [field.value] : []}
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            classNames={{
              trigger: [
                bgWhite ? "bg-white" : "",
                fieldState.invalid ? "border-red-500" : "border-gray-300",

                // 🔥 MATIKAN SEMUA FOCUS
                "outline-none",
                "focus:outline-none",
                "focus-visible:outline-none",
                "focus:ring-0",
                "focus-visible:ring-0",

                // focus border custom
                "focus:border-gray-200",
                "focus-visible:border-gray-200",
              ],
              value: ["placeholder:text-grey", isDark ? "text-white" : ""],
            }}
          >
            {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
          </Select>
        );
      }}
    />
  );
}
