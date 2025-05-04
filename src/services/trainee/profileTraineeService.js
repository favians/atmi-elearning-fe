import { storageKeys } from "@/constants/storage-keys";
import { URL_INTERNAL_PROFILE, URL_TRAINEE_PROFILE } from "@/constants/urls";
import { api } from "@/utils/api";
import { getCookie } from "cookies-next";

export const profileTraineeService = {
  getProfile: async () => {
    const role = getCookie(storageKeys.ROLE);
    const url = role === "USER" ? URL_TRAINEE_PROFILE : URL_INTERNAL_PROFILE;
    return api.get(url).then((res) => {
      return res?.data;
    });
  },
};
