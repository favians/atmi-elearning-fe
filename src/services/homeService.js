import { URL_HOME } from '@/constants/urls';
import { api } from '@/utils/api';
import { sprintf } from 'sprintf';

export const homeService = {
  getList: async () => {
    const url = sprintf(URL_HOME);

    return api.get(url).then((res) => {
      return res?.data?.data;
    });
  },
};
