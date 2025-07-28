import { Input } from "@heroui/input";
import { Controller } from "react-hook-form";

export default function InputForm(props) {
  const { control, name, isDark, isCurrency, ...rest } = props;

  // Format "1000000" → "1.000.000"
  const formatCurrency = (value) => {
    if (!value) return "";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Unformat "1.000.000" → "1000000"
  const unformatCurrency = (value) => value.replace(/\D/g, "");

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const formattedValue = isCurrency
          ? formatCurrency(field.value || "")
          : field.value || "";

        const handleChange = (e) => {
          const rawValue = isCurrency
            ? unformatCurrency(e.target.value)
            : e.target.value;
          field.onChange(rawValue);
        };

        return (
          <Input
            {...rest}
            value={formattedValue}
            onChange={handleChange}
            onBlur={field.onBlur}
            name={field.name}
            ref={field.ref}
            variant="bordered"
            classNames={{
              label: "mb-0",
              input: ["placeholder:text-grey", isDark ? "text-white" : ""],
            }}
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.error?.message}
          />
        );
      }}
    />
  );
}
