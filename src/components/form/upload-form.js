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
  } = props;

  const onChangeFile = (e, onChange) => {
    onChange(e.target.files?.[0]);
    if (isWithPreview) {
      getBase64(e);
    }
  };

  const getBase64 = (e) => {
    var file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onHandleImageChange(reader.result);
    };
    reader.onerror = function (error) {
      onHandleImageChange("");
    };
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <label className="text-sm w-full text-secondary text-center mt-2 cursor-pointer">
          <Input
            variant="bordered"
            classNames={{
              label: "mb-0",
              base: "cursor-pointer",
              input: ["placeholder:text-grey cursor-pointer hidden"],
              inputWrapper: "px-0 !cursor-pointer",
              errorMessage: "text-left",
              helperWrapper: "text-left",
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

                {field.value?.name ? (
                  <div className="text-sm ml-2 text-black">
                    {field.value.name}
                  </div>
                ) : (
                  <div className="text-grey-800 text-sm ml-2">
                    {props.placeholder}
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

                    if (isWithPreview) onHandleDeleteImage();
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
