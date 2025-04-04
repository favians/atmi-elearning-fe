import { Input } from "@heroui/input";
import { Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { IoMdCloseCircle } from "react-icons/io";

export default function UploadForm(props) {
  const { control, name } = props;

  const onChangeFile = (e, onChange) => {
    if (e.target.files?.[0] === undefined) {
      return;
    }
    if (e.target.files?.[0]?.size > 500000) {
      toast.error("File tidak boleh lebih dari 500kbps");
      return;
    }
    if (
      e.target.files?.[0]?.type !== "image/png" &&
      e.target.files?.[0]?.type !== "image/jpeg" &&
      e.target.files?.[0]?.type !== "image/jpg"
    ) {
      toast.error(`File format ${e.target.files?.[0]?.type} belum support`);
      return;
    }
    onChange(e.target.files?.[0]);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <label className="text-sm text-secondary text-center mt-2 cursor-pointer">
          <Input
            variant="bordered"
            classNames={{
              label: "mb-0",
              base: "cursor-pointer",
              input: ["placeholder:text-grey cursor-pointer hidden"],
              inputWrapper: "px-0 !cursor-pointer",
            }}
            type="file"
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.invalid && fieldState.error?.message}
            {...props}
            onChange={(e) => {
              onChangeFile(e, field.onChange);
            }}
            startContent={
              <>
                <div className="px-1 py-1 m-1 rounded-md border-1 text-sm text-secondary">
                  Browser File
                </div>

                {field.value?.name && (
                  <div className="text-sm ml-2 text-black">
                    {field.value.name}
                  </div>
                )}
              </>
            }
            endContent={
              field.value && (
                <div
                  className="absolute right-2 z-20 text-grey-800"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent the click event from propagating to the file input
                    field.onChange(null);
                  }}
                >
                  <IoMdCloseCircle size={20} />
                </div>
              )
            }
          />
        </label>
      )}
    />
  );
}
