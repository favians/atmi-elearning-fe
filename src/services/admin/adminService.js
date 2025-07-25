import { URL_INTERNAL_ADMIN } from "@/constants/urls";
import { api } from "@/utils/api";
import { stringifyQueryParam } from "@/utils/common";
import { sprintf } from "sprintf";

export const _generateAdminData = (values) => {
  let data = {};

  Object.entries(values).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      if (key === "role") {
        data[key] = value ? "SUPER_ADMIN" : "ADMIN";
      } else {
        data[key] = value;
      }
    }
  });

  return data;
};
export const adminService = {
  getList: async ({ params }) => {
    const queryParamString = stringifyQueryParam(params);
    const url = sprintf(URL_INTERNAL_ADMIN, { params: queryParamString });

    return api.get(url).then((res) => {
      return res?.data;
    });
  },
  createAdmin: async (payload) => {
    const url = sprintf(URL_INTERNAL_ADMIN, { params: "" });
    const formData = new FormData();
    const data = _generateAdminData(payload);

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
  updateAdmin: async (payload) => {
    const url = sprintf(URL_INTERNAL_ADMIN, { params: "" });
    const formData = new FormData();
    const data = _generateAdminData(payload);

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
