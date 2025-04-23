import { URL_INTERNAL_CERTIFICATE } from "@/constants/urls";
import { parseDate } from "@/helpers/Date";
import { api } from "@/utils/api";
import { stringifyQueryParam } from "@/utils/common";
import { sprintf } from "sprintf";
export const _generateCertificateData = (values) => {
  let data = {
    ...values,
    assign_date: parseDate(values?.assign_date, "DD/MM/YYYY"),
  };

  return data;
};
export const certificateAdminService = {
  getList: async ({ params }) => {
    const queryParamString = stringifyQueryParam(params);
    const url = sprintf(URL_INTERNAL_CERTIFICATE, { params: queryParamString });

    return api.get(url).then((res) => {
      return res?.data;
    });
  },

  createCertificate: async (payload) => {
    const url = sprintf(URL_INTERNAL_CERTIFICATE, { params: "" });
    const formData = new FormData();
    const data = _generateCertificateData(payload);

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
