import { trunc } from "@/helpers/Text";
import { Input } from "@heroui/input";
import { Controller } from "react-hook-form";
import { IoMdCloseCircle } from "react-icons/io";

export default function UploadForm(props) {
  const {
    control,
    name,
    isWithPreview,
    onHandleImageChange,
    onHandleDeleteImage,
    defaultValue,
    label,
    ...restProps // <-- ini penting
  } = props;

  const onChangeFile = (e, onChange) => {
    onChange(e.target.files?.[0]);
    if (isWithPreview) {
      getBase64(e);
    }
  };

  const getBase64 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onHandleImageChange(reader.result);
    };
    reader.onerror = () => {
      onHandleImageChange("");
    };
  };

  return (
    <div className="w-full mt-2">
      {/* Label manual di atas */}
      {label && (
        <label className="text-sm text-black block mb-1">{label}</label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Input
            {...restProps} // <-- TIDAK pakai {...props}
            variant="bordered"
            type="file"
            label="" // pastikan kosong
            labelPlacement="outside"
            classNames={{
              base: "cursor-pointer relative",
              input: "absolute inset-0 w-full h-full opacity-0 cursor-pointer",
              inputWrapper:
                "px-3 h-12 flex items-center justify-between cursor-pointer",
              errorMessage: "text-left",
              helperWrapper: "text-left",
            }}
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            onChange={(e) => onChangeFile(e, field.onChange)}
            startContent={
              <div className="flex items-center gap-3 w-full overflow-hidden">
                <div className="px-3 py-1 rounded-md border text-xs font-medium whitespace-nowrap">
                  Browse File
                </div>

                <div className="text-sm text-black truncate">
                  {field.value?.name
                    ? trunc(field.value.name, 42)
                    : defaultValue
                      ? trunc(defaultValue, 42)
                      : restProps.placeholder}
                </div>
              </div>
            }
            endContent={
              field.value && (
                <div
                  className="flex items-center justify-center text-grey-800 hover:text-danger cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    field.onChange(null);
                    if (isWithPreview) onHandleDeleteImage();
                  }}
                >
                  <IoMdCloseCircle size={20} />
                </div>
              )
            }
          />
        )}
      />
    </div>
  );
}
