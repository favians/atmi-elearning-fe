import { URL_HOME, URL_TOPIC } from "@/constants/urls";
import { api } from "@/utils/api";
import { sprintf } from "sprintf";

export const homeService = {
  getList: async () => {
    const url = sprintf(URL_HOME);

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
};
