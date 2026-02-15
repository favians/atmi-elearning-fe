"use client";
import InputForm from "@/components/form/input-form";
import { useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import SelectForm from "@/components/form/select-form";
import { Button } from "@heroui/button";
import debounce from "lodash.debounce";
import { useState } from "react";
import { DateRangePicker } from "@heroui/date-picker";
import { I18nProvider } from "@react-aria/i18n";

export default function FilterAdmin(props) {
  const { control, reset, setValue } = useForm({
    mode: "onChange",
    defaultValues: {
      search: "",
      sort: "DESC",
    },
  });
  const [dateRange, setDateRange] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
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
        <div className="w-[850px] flex justify-end items-center gap-4">
          <I18nProvider locale="id-ID">
            <DateRangePicker
              placeholder="Tanggal"
              value={dateRange}
              onChange={(range) => {
                setDateRange(range);

                if (!range) {
                  setStartDate(null);
                  setEndDate(null);
                  return;
                }

                setStartDate(range.start);
                setEndDate(range.end);
              }}
            />
          </I18nProvider>
          <SelectForm
            placeholder="Sort"
            name="sort"
            control={control}
            data={sort}
            labelPlacement="outside"
            classNames={{ label: "hidden" }}
            onSelectionChange={onSortChange}
          />
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
