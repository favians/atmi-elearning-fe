import {
  URL_EDIT_INTERNAL_MATERIAL,
  URL_INTERNAL_MATERIAL,
} from "@/constants/urls";
import { api } from "@/utils/api";
import { stringifyQueryParam } from "@/utils/common";
import { sprintf } from "sprintf";
export const _generateTrainingData = (values) => {
  let data = {};

  Object.entries(values).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      data[key] = value;
    }
  });

  return data;
};
export const materialAdminService = {
  getList: async ({ params }) => {
    const queryParamString = stringifyQueryParam(params);
    const url = sprintf(URL_INTERNAL_MATERIAL, { params: queryParamString });

    return api.get(url).then((res) => {
      return res?.data;
    });
  },
  getEditMaterial: async ({ params }) => {
    const queryParamString = stringifyQueryParam(params);
    const url = sprintf(URL_EDIT_INTERNAL_MATERIAL, {
      params: queryParamString,
    });

    return api.get(url).then((res) => {
      return res?.data;
    });
  },
  update: async ({ id, ...payload }) => {
    const url = sprintf(URL_INTERNAL_MATERIAL, { params: id });

    const formData = new FormData();
    const data = _generateTrainingData(payload);

    for (let key in data) {
      formData.append(key, data[key]);
    }

    return api
      .put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: payload?.onProgress,
      })
      .then((res) => res?.data?.data);
  },
};
