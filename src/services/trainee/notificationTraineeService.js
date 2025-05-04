import { URL_TRAINEE_NOTIFICATION } from "@/constants/urls";
import { api } from "@/utils/api";

export const notificationTraineeService = {
  getNotif: async () => {
    return api.get(URL_TRAINEE_NOTIFICATION).then((res) => {
      return res?.data;
    });
  },
};
