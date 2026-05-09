"use client";
import InputForm from "@/components/form/input-form";
import { useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import SelectForm from "@/components/form/select-form";
import { Button } from "@heroui/button";
import debounce from "lodash.debounce";

export default function FilterCertificate(props) {
  const { control, reset, setValue } = useForm({
    mode: "onChange",
    defaultValues: {
      search: "",
      sort: "DESC",
    },
  });
  const onValueChange = (val) => {
    const value = { name_search: val };
    setValue("search", val);
    props.onValueChange(value);
  };
  const onSearchChange = debounce(onValueChange, 500);
  const onSortChange = (value) => {
    setValue("sort", value?.currentKey);
    props.onValueChange({
      order_by: "id",
      order_rule: value?.currentKey,
    });
  };

  const sort = [
    { key: "ASC", label: "ASC" },
    { key: "DESC", label: "DESC" },
  ];
  return (
    <div>
      <form className="mt-2 flex justify-start gap-4 max-[667px]:flex-col">
        <div className="mt-5 w-[850px] max-[667px]:mt-0 max-[667px]:w-full">
          {" "}
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
        <div className="max-[667px]:w-full">
          <SelectForm
            label="Sort"
            placeholder="Sort"
            name="sort"
            control={control}
            data={sort}
            labelPlacement="outside"
            classNames={{ label: "hidden" }}
            onSelectionChange={onSortChange}
          />
        </div>

        <Button
          className="mt-6 min-w-28 max-[667px]:mt-0 max-[667px]:w-full"
          onPress={() => {
            const value = { name_search: "", order_rule: "DESC" };

            reset();
            props.onValueChange(value);
          }}
          color="primary"
        >
          Reset Filter
        </Button>
      </form>
    </div>
  );
}
