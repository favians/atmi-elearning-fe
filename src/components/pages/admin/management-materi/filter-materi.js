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
    <div className="mt-2">
      <form className=" gap-4 flex justify-around items-center ">
        <div className="w-full -mt-1 flex justify-start">
          <div className="w-[350px]">
            <InputForm
              label=" "
              placeholder="Search..."
              name="search"
              control={control}
              startContent={<CiSearch />}
              labelPlacement="outside"
              classNames={{ label: "hidden" }}
              onValueChange={onSearchChange}
            />
          </div>
        </div>
        <div className="w-[600px] flex justify-end items-center gap-4">
          <Button
            className="min-w-28 "
            onPress={() => {
              const value = { name_search: "", order_rule: "DESC" };

              reset();
              props.onValueChange(value);
            }}
            color="primary"
          >
            Reset Filter
          </Button>
        </div>
      </form>
    </div>
  );
}
