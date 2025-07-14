import {
  URL_BADGE_TRAINING_LIST,
  URL_INTERNAL_TRAINING,
  URL_INTERNAL_TRAINING_LIST,
  URL_TOPIC_TRAINING_LIST,
  URL_TRAINER_TRAINING_LIST,
} from "@/constants/urls";
import { api } from "@/utils/api";
import { apiUpload } from "@/utils/apiUpload";
import { sprintf } from "sprintf";
export const _generateTrainingData = (values) => {
  let data = {};

  Object.entries(values).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      data[key] = value;
    }
  });

  return data;
};
export const trainingAdminService = {
  createTraining: async (payloadWithProgress) => {
    const { onProgress, ...payload } = payloadWithProgress;
    const url = sprintf(URL_INTERNAL_TRAINING);
    const formData = new FormData();
    const currentData = _generateTrainingData(payload);

    const data = {
      ...currentData,
    };

    for (let key in data) {
      const value = data[key];
      formData.append(key, value);
    }
    return apiUpload
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
          if (onProgress) {
            const percent = Math.round((event.loaded * 100) / event.total);
            onProgress(percent);
          }
        },
      })
      .then((res) => res?.data?.data);
  },
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

  getBadgeList: async () => {
    const url = sprintf(URL_BADGE_TRAINING_LIST);

    return api.get(url).then((res) => {
      const transformed = res?.data?.data.map((user) => ({
        key: user.name,
        label: user.name,
      }));
      return transformed;
    });
  },

  getTopicList: async () => {
    const url = sprintf(URL_TOPIC_TRAINING_LIST);

    return api.get(url).then((res) => {
      const transformed = res?.data?.data.map((user) => ({
        key: user.id,
        label: user.title,
      }));
      return transformed;
    });
  },
  getTrainerList: async () => {
    const url = sprintf(URL_TRAINER_TRAINING_LIST);

    return api.get(url).then((res) => {
      const transformed = res?.data?.data.map((user) => ({
        key: user.id,
        label: user.full_name,
      }));
      return transformed;
    });
  },
};
