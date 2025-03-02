import { URL_TRAINEE_HOME, URL_TRAINEE_NOTIFICATION, URL_TRAINEE_READ_ALL_NOTIFICATION } from '@/constants/urls';
import { api } from '@/utils/api';
import { sprintf } from 'sprintf';

export const notificationService = {
  getList: async () => {
    const url = sprintf(URL_TRAINEE_NOTIFICATION);

    return api.get(url).then((res) => {
      return res?.data?.data;
    });
  },
  getHome: async () => {
    const url = sprintf(URL_TRAINEE_HOME);

    return api.get(url).then((res) => {
      return res?.data?.data;
    });
  },
  readAll: async () => {
    const url = sprintf(URL_TRAINEE_READ_ALL_NOTIFICATION);

    return api.put(url).then((res) => {
      return res?.data?.data;
    });
  },
};
