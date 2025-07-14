import {
  URL_CATEGORY_NAVBAR,
  URL_DETAIL_TRAINING,
  URL_HOME,
  URL_SEARCH_TRAINING,
  URL_TOPIC,
  URL_TRAINING,
} from "@/constants/urls";
import { api } from "@/utils/api";
import { stringifyQueryParam } from "@/utils/common";
import { sprintf } from "sprintf";

export const homeService = {
  getList: async () => {
    const url = sprintf(URL_HOME);

    return api.get(url).then((res) => {
      return res?.data?.data;
    });
  },
  getSearchTraining: async ({ params }) => {
    const queryParamString = stringifyQueryParam(params);
    const url = sprintf(URL_SEARCH_TRAINING, { params: queryParamString });

    return api.get(url).then((res) => {
      return res?.data?.data;
    });
  },
  getTopic: async () => {
    const url = sprintf(URL_TOPIC);

    return api.get(url).then((res) => {
      return res?.data?.data;
    });
  },
  getTraining: async ({ params }) => {
    const queryParamString = stringifyQueryParam(params);
    const url = sprintf(URL_TRAINING, { params: queryParamString });

    return api.get(url).then((res) => {
      return res?.data;
    });
  },
  getDetailTraining: async ({ params }) => {
    const queryParamString = stringifyQueryParam(params);
    const url = sprintf(URL_DETAIL_TRAINING, { params: queryParamString });

    return api.get(url).then((res) => {
      return res?.data?.data;
    });
  },
  getCategoryNavbar: async () => {
    const url = sprintf(URL_CATEGORY_NAVBAR);

    return api.get(url).then((res) => {
      return res?.data?.data;
    });
  },
};
