import { URL_INTERNAL_CERTIFICATE } from "@/constants/urls";
import { api } from "@/utils/api";
import { stringifyQueryParam } from "@/utils/common";
import { sprintf } from "sprintf";

export const certificateAdminService = {
  getList: async ({ params }) => {
    const queryParamString = stringifyQueryParam(params);
    const url = sprintf(URL_INTERNAL_CERTIFICATE, { params: queryParamString });

    return api.get(url).then((res) => {
      return res?.data;
    });
  },
};
