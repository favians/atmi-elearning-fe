"use client";
import InputForm from "@/components/form/input-form";
import { useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import SelectForm from "@/components/form/select-form";
import { Button } from "@heroui/button";
import debounce from "lodash.debounce";
import { useGetTraineeList } from "@/hooks/admin/useGetTrainee";

export default function FilterTrainer(props) {
  const { control, reset, setValue } = useForm({
    mode: "onChange",
    defaultValues: {
      search: "",
      sort: "DESC",
    },
  });
  const { data: dataSkill, isLoading: isLoadingSkill } = useGetTraineeList();
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
  const onSkillChange = (value) => {
    setValue("skill_id", value?.currentKey);
    props.onValueChange({
      skill_id: value?.currentKey,
    });
  };
  const sort = [
    { key: "ASC", label: "ASC" },
    { key: "DESC", label: "DESC" },
  ];

  return (
    <div className="">
      <form className=" gap-4 flex justify-around items-center ">
        <div className="w-3/4 -mt-1 flex justify-start">
          <div className="w-[400px]">
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
        <div className="w-full flex justify-end items-center gap-4">
          {" "}
          {/* <SelectForm
            placeholder="Keahlian"
            name="skill_id"
            control={control}
            data={dataSkill || []}
            isLoading={isLoadingSkill}
            labelPlacement="outside"
            classNames={{ label: "hidden" }}
            onSelectionChange={onSkillChange}
            ariaLabelledby="skill_id"
          /> */}
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
