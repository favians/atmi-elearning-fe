"use client";
import InputForm from "@/components/form/input-form";
import { useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import SelectForm from "@/components/form/select-form";
import { Button } from "@heroui/button";
import debounce from "lodash.debounce";
import { useState, useMemo } from "react";
import { DateRangePicker } from "@heroui/date-picker";
import { I18nProvider } from "@react-aria/i18n";
import { FiXCircle } from "react-icons/fi";

export default function FilterAdmin(props) {
  const { control, reset, setValue } = useForm({
    mode: "onChange",
    defaultValues: {
      search: "",
      sort: "DESC",
    },
  });

  const [dateRange, setDateRange] = useState(null);

  // ✅ function convert ke timestamp (SAMA seperti contoh kamu)
  const formatDateToTimestamp = (date, isEnd = false) => {
    if (!date) return null;

    const jsDate = new Date(
      date.year,
      date.month - 1,
      date.day,
      isEnd ? 23 : 0,
      isEnd ? 59 : 0,
      isEnd ? 59 : 0,
    );

    return Math.floor(jsDate.getTime() / 1000);
  };

  // ✅ SEARCH
  const onValueChange = (val) => {
    setValue("search", val);

    props.onValueChange({
      name_search: val,
      page: 1,
    });
  };

  const onSearchChange = useMemo(() => debounce(onValueChange, 500), []);

  // ✅ SORT
  const onSortChange = (value) => {
    setValue("sort", value?.currentKey);

    props.onValueChange({
      order_by: "id",
      order_rule: value?.currentKey,
      page: 1,
    });
  };

  // ✅ DATE RANGE FILTER (INI BAGIAN UTAMA)
  const onDateChange = (range) => {
    setDateRange(range);

    if (!range) {
      props.onValueChange({
        created_date_from: null,
        created_date_to: null,
        page: 1,
      });
      return;
    }

    props.onValueChange({
      created_date_from: formatDateToTimestamp(range.start),
      created_date_to: formatDateToTimestamp(range.end, true),
      page: 1,
    });
  };

  const sort = [
    { key: "ASC", label: "ASC" },
    { key: "DESC", label: "DESC" },
  ];

  // ✅ RESET FILTER
  const handleReset = () => {
    reset();
    setDateRange(null);

    props.onValueChange({
      name_search: "",
      order_rule: "DESC",
      created_date_from: null,
      created_date_to: null,
      page: 1,
    });
  };

  return (
    <div>
      <form className="gap-4 flex justify-around items-center">
        {/* SEARCH */}
        <div className="w-full flex justify-start">
          <div className="w-[350px]">
            <InputForm
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

        {/* RIGHT FILTER */}
        <div className="w-[850px] flex justify-end items-center gap-4">
          {/* DATE RANGE */}
          <div className="relative">
            <I18nProvider locale="id-ID">
              <DateRangePicker
                className="max-w-xs pr-10" // kasih space buat icon
                value={dateRange}
                onChange={onDateChange}
                placeholder="Tanggal"
                selectorButtonPlacement="start"
              />
            </I18nProvider>

            {/* CLEAR BUTTON */}
            {dateRange && (
              <button
                type="button"
                onClick={() => onDateChange(null)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FiXCircle size={16} />
              </button>
            )}
          </div>

          {/* SORT */}
          <SelectForm
            placeholder="Sort"
            name="sort"
            control={control}
            data={sort}
            labelPlacement="outside"
            classNames={{ label: "hidden" }}
            onSelectionChange={onSortChange}
          />

          {/* RESET */}
          <Button className="min-w-28" onPress={handleReset} color="primary">
            Reset Filter
          </Button>
        </div>
      </form>
    </div>
  );
}
