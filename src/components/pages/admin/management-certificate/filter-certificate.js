"use client";
import InputForm from "@/components/form/input-form";
import { useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import SelectForm from "@/components/form/select-form";
import { Button } from "@heroui/button";
import debounce from "lodash.debounce";
import { useGetTrainingList } from "@/hooks/admin/useGetTraining";

export default function FilterCertificate(props) {
  const { data: dataTraining, isLoading: isLoadingTraining } =
    useGetTrainingList();
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

  const onTrainingChange = (value) => {
    setValue("training_id", value?.currentKey);
    props.onValueChange({
      training_id: value?.currentKey,
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
          ariaLabelledby="username"
        />
        <SelectForm
          placeholder="Pelatihan"
          name="training_id"
          control={control}
          data={dataTraining || []}
          isLoading={isLoadingTraining}
          labelPlacement="outside"
          classNames={{ label: "hidden" }}
          onSelectionChange={onTrainingChange}
          ariaLabelledby="training_id"
        />

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

        <Button
          onPress={() => {
            const value = {
              name_search: "",
              order_rule: "DESC",
              training_id: "",
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
