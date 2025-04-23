import { URL_INTERNAL_TRAINING_LIST } from "@/constants/urls";
import { api } from "@/utils/api";
import { sprintf } from "sprintf";

export const trainingAdminService = {
  getOptionList: async () => {
    const url = sprintf(URL_INTERNAL_TRAINING_LIST);

    return api.get(url).then((res) => {
      const transformed = res?.data?.data.map((user) => ({
        key: user.id,
        label: user.title,
      }));
      return transformed;
    });
  },
};
