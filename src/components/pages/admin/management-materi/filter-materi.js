"use client";
import InputForm from "@/components/form/input-form";
import { useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import { Button } from "@heroui/button";
import debounce from "lodash.debounce";

export default function FilterMateri(props) {
  const { control, reset, setValue } = useForm({
    mode: "onChange",
    defaultValues: {
      search: "",
    },
  });
  const onValueChange = (val) => {
    const value = { name_search: val };
    setValue("search", val);
    props.onValueChange(value);
  };
  const onSearchChange = debounce(onValueChange, 500);

  return (
    <div className="-mt-2">
      <form className=" gap-4 flex justify-between">
        <div className=" flex w-1/2">
          <InputForm
            label="Search"
            placeholder="Search..."
            name="username"
            control={control}
            startContent={<CiSearch />}
            labelPlacement="outside"
            classNames={{ label: "hidden" }}
            onValueChange={onSearchChange}
            ariaLabelledby="username"
          />
        </div>

        <Button
          onPress={() => {
            const value = {
              name_search: "",
            };

            reset();
            props.onValueChange(value);
          }}
          className="min-w-28 mt-6"
          color="primary"
        >
          Reset Filter
        </Button>
      </form>
    </div>
  );
}
