import { Image } from "@heroui/image";
import { Input } from "@heroui/input";
import { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { FiCamera } from "react-icons/fi";
import { GoPlusCircle } from "react-icons/go";
import { RiDeleteBinLine } from "react-icons/ri";

export default function UploadDragForm(props) {
  const { control, name, image, setImage } = props;
  const ref = useRef();

  const onChangeFile = (e, onChange) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files?.[0]));
    }
    onChange(file);
  };

  const onDelete = (e, onChange) => {
    e.preventDefault();

    ref.current.value = "";
    setImage(null);
    onChange(null);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <label className="text-sm text-secondary text-center mt-2 cursor-pointer">
          <Input
            ref={ref}
            variant="bordered"
            classNames={{
              label: "mb-0",
              base: "cursor-pointer ",
              input: ["placeholder:text-grey cursor-pointer hidden"],
              inputWrapper: "px-0 !cursor-pointer border-0 shadow-none h-auto",
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
                {!image ? (
                  <div className="p-4 min-w-72 py-6 m-1 flex flex-col items-center justify-center bg-grey-300 rounded-md border-1 text-sm text-grey-800">
                    <GoPlusCircle size={24} className="mb-1" />
                    <span>Upload Cover Pelatihan</span>
                    <span>256 x 131</span>
                    <span>File yang didukung PNG, JPG & JPEG</span>
                  </div>
                ) : (
                  field.value?.name && (
                    <div className="text-sm  max-w-[256px] relative overflow-hidden  ml-2 border-1 rounded-md text-black">
                      <Image
                        alt="preview image"
                        src={image}
                        width={256}
                        className="object-center opacity-100"
                      />
                      <div className="absolute bottom-0 left-0 z-10 text-[10px] items-center text-center bg-black/80 h-16 flex w-full">
                        <div
                          onClick={(e) => {
                            onDelete(e, field.onChange);
                          }}
                          className="p-2 flex-1 border-r-1 border-r-grey-900 flex flex-col gap-1 items-center text-white text-center"
                        >
                          <RiDeleteBinLine size={18} />
                          Hapus Cover Skema
                        </div>

                        <div className="p-2 flex-1 flex flex-col gap-1 items-center text-white text-center">
                          <FiCamera size={18} />
                          Replace
                        </div>
                      </div>
                    </div>
                  )
                )}
              </>
            }
          />
        </label>
      )}
    />
  );
}
