import {
  URL_INTERNAL_TRAINEE,
  URL_INTERNAL_TRAINEE_LIST,
} from "@/constants/urls";
import { api } from "@/utils/api";
import { stringifyQueryParam } from "@/utils/common";
import { sprintf } from "sprintf";

export const _generateTraineeData = (values) => {
  let data = {
    ...values,
    training_id: 3,
  };

  return data;
};

export const traineeAdminService = {
  getList: async ({ params }) => {
    const queryParamString = stringifyQueryParam(params);
    const url = sprintf(URL_INTERNAL_TRAINEE, { params: queryParamString });

    return api.get(url).then((res) => {
      return res?.data;
    });
  },
  getOptionList: async () => {
    const url = sprintf(URL_INTERNAL_TRAINEE_LIST);

    return api.get(url).then((res) => {
      const transformed = res?.data?.data.map((user) => ({
        key: user.id,
        label: user.full_name,
      }));
      return transformed;
    });
  },
  createTrainee: async (payload) => {
    const url = sprintf(URL_INTERNAL_TRAINEE, { params: "" });
    const formData = new FormData();
    const data = _generateTraineeData(payload);

    for (let key in data) {
      const value = data[key];
      formData.append(key, value);
    }
    return api
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        return res?.data?.data;
      });
  },
};
