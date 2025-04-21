import { URL_SIGN_ADMIN, URL_SIGN_IN } from "@/constants/urls";
import { api } from "@/utils/api";

export const authService = {
  signIn: async (payload) => {
    const { data } = await api.post(URL_SIGN_IN, payload, {
      headers: {},
    });
    return data;
  },
  signInAdmin: async (payload) => {
    const { data } = await api.post(URL_SIGN_ADMIN, payload, {
      headers: {},
    });
    return data;
  },
};
