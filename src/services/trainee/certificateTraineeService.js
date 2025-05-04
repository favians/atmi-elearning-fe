import { URL_TRAINEE_CERTIFICATE } from "@/constants/urls";
import { api } from "@/utils/api";
import { stringifyQueryParam } from "@/utils/common";
import { sprintf } from "sprintf";

export const certificateTraineeService = {
  getList: async ({ params }) => {
    const queryParamString = stringifyQueryParam(params);
    const url = sprintf(URL_TRAINEE_CERTIFICATE, { params: queryParamString });

    return api.get(url).then((res) => {
      return res?.data;
    });
  },
};
