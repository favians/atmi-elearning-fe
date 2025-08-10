import { Textarea } from "@heroui/input";
import { Controller } from "react-hook-form";

export default function TextAreaForm(props) {
  const { control, name, isDark, maxLength, ...rest } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const currentLength = field.value?.length || 0;

        const handleChange = (e) => {
          const newValue = maxLength
            ? e.target.value.slice(0, maxLength)
            : e.target.value;
          field.onChange(newValue);
        };

        return (
          <div className="relative w-full">
            <Textarea
              {...rest}
              value={field.value || ""}
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
            {maxLength && (
              <div className="text-xs text-right mt-1 text-gray-500">
                {currentLength} / {maxLength}
              </div>
            )}
          </div>
        );
      }}
    />
  );
}
