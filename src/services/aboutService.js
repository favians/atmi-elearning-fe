import { URL_ABOUT } from "@/constants/urls";
import { api } from "@/utils/api";
import { sprintf } from "sprintf";

export const aboutService = {
  getList: async () => {
    const url = sprintf(URL_ABOUT);

    return api.get(url).then((res) => {
      return res?.data?.data;
    });
  },
};
