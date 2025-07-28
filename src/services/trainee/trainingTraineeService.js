import {
  URL_TRAINEE_TRAINING,
  URL_TRAINEE_TRAINING_DETAIL,
  URL_TRAINEE_UPDATE_PROGRESS,
} from "@/constants/urls";
import { api } from "@/utils/api";
import { stringifyQueryParam } from "@/utils/common";
import { sprintf } from "sprintf";

export const trainingTraineeService = {
  getList: async ({ params }) => {
    const queryParamString = stringifyQueryParam(params);
    const url = sprintf(URL_TRAINEE_TRAINING, { params: queryParamString });

    return api.get(url).then((res) => {
      return res?.data;
    });
  },
  getDetail: async ({ params }) => {
    const queryParamString = stringifyQueryParam(params);
    const url = sprintf(URL_TRAINEE_TRAINING_DETAIL, {
      params: queryParamString,
    });

    return api.get(url).then((res) => {
      return res?.data?.data;
    });
  },
  updateProgress: async (payload) => {
    return api.put(URL_TRAINEE_UPDATE_PROGRESS, payload).then((res) => {
      return res?.data?.data;
    });
  },
};
