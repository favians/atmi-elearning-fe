import React from "react";
import { Controller, useFieldArray } from "react-hook-form";

export const ArrayForm = (props) => {
  const { name, control } = props;
  const { fields, append, remove } = useFieldArray({
    control,
    name: name,
  });
  return (
    <ul>
      {fields.map((item, index) => (
        <li key={item.id}>
          <Controller
            render={({ field }) => <input {...field} />}
            name={`test.${index}.lastName`}
            control={control}
          />
          <button type="button" onClick={() => remove(index)}>
            Delete
          </button>
        </li>
      ))}
      <button
        type="button"
        onClick={() => append({ firstName: "bill", lastName: "luo" })}
      >
        append
      </button>
    </ul>
  );
};
