"use client";
import InputForm from "@/components/form/input-form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import SelectForm from "@/components/form/select-form";
import { Button } from "@heroui/button";
import DatePickerForm from "@/components/form/date-picker-form";
import debounce from "lodash.debounce";

export default function FilterCertificate() {
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
    { key: "asc", label: "ASC" },
    { key: "desc", label: "DESC" },
  ];
  return (
    <div className="-mt-2">
      <form className=" gap-4 flex ">
        <InputForm
          label="Search"
          placeholder="Search..."
          name="username"
          control={control}
          startContent={<CiSearch />}
          labelPlacement="outside"
          classNames={{ label: "hidden" }}
          onValueChange={onSearchChange}
        />

        <DatePickerForm
          label=""
          placeholder="Tanggal"
          name="date"
          control={control}
          labelPlacement="outside"
          classNames={{ base: "mt-6" }}
        />

        <SelectForm
          label="Sort"
          placeholder="Sort"
          name="course"
          control={control}
          data={sort}
          labelPlacement="outside"
          classNames={{ label: "hidden" }}
          onSelectionChange={onSortChange}
        />

        <Button
          onPress={() => {
            const value = { name_search: "", order_rule: "DESC" };

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
