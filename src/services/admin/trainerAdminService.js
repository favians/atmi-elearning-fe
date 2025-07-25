import { URL_INTERNAL_TRAINER } from "@/constants/urls";
import { api } from "@/utils/api";
import { stringifyQueryParam } from "@/utils/common";
import { sprintf } from "sprintf";

export const _generateTrainerData = (values) => {
  let data = {};

  Object.entries(values).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      data[key] = value;
    }
  });

  return data;
};
export const trainerAdminService = {
  getList: async ({ params }) => {
    const queryParamString = stringifyQueryParam(params);
    const url = sprintf(URL_INTERNAL_TRAINER, { params: queryParamString });

    return api.get(url).then((res) => {
      return res?.data;
    });
  },
  createTrainer: async (payload) => {
    const url = sprintf(URL_INTERNAL_TRAINER, { params: "" });
    const formData = new FormData();
    const data = _generateTrainerData(payload);

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
  updateTrainer: async (payload) => {
    const url = sprintf(URL_INTERNAL_TRAINER, { params: "" });
    const formData = new FormData();
    const data = _generateTrainerData(payload);

    for (let key in data) {
      const value = data[key];
      formData.append(key, value);
    }
    return api
      .put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        return res?.data?.data;
      });
  },
};
