import { Input } from "@heroui/input";
import { Controller } from "react-hook-form";

export default function InputForm(props) {
  const {
    control,
    name,
    label,
    bgWhite,
    isRequired,
    isDark,
    isCurrency,
    optionForm,
    ...rest
  } = props;

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
      rules={
        isRequired ? { required: `${label || "Field"} wajib diisi` } : undefined
      }
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
          <div className={`flex gap-1 ${optionForm ? "w-full" : "flex-col "}`}>
            {/* Label */}
            {label && (
              <label
                htmlFor={name}
                className="text-sm font-medium text-gray-700"
              >
                {label} {isRequired && <span className=" text-red-500">*</span>}
              </label>
            )}

            {/* Input */}
            <Input
              {...rest}
              id={name}
              aria-label={name}
              aria-labelledby={name}
              value={formattedValue}
              onChange={handleChange}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
              variant="bordered"
              classNames={{
                input: [
                  "placeholder:text-grey",
                  isDark ? "text-white" : "",
                  "focus:outline-none",
                ],
                inputWrapper: [
                  bgWhite ? "bg-white" : "",
                  "border border-gray-300",
                  "focus-within:border-gray-300",
                  "focus-within:ring-0",
                ],
              }}
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
              isRequired={isRequired}
            />
          </div>
        );
      }}
    />
  );
}
