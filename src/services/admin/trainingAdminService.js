import {
  URL_BADGE_TRAINING_LIST,
  URL_INTERNAL_TRAINING,
  URL_INTERNAL_TRAINING_LIST,
  URL_INTERNAL_UPDATE_TRAINING,
  URL_TOPIC_TRAINING_LIST,
  URL_TRAINER_TRAINING_LIST,
  URL_TRAINING_SUBMIT_QUIS,
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
  updateTraining: async (payloadWithProgress) => {
    const { id, onProgress, ...payload } = payloadWithProgress;

    const url = sprintf(URL_INTERNAL_UPDATE_TRAINING, { id });
    const formData = new FormData();

    const currentData = _generateTrainingData(payload);

    const data = {
      id,
      ...currentData,
    };

    const appendFormData = (formData, data, parentKey = "") => {
      if (data === null || data === undefined) return;

      // skip empty object {}
      if (
        typeof data === "object" &&
        !Array.isArray(data) &&
        !(data instanceof File) &&
        Object.keys(data).length === 0
      ) {
        return;
      }

      if (data instanceof File) {
        formData.append(parentKey, data);
        return;
      }

      if (Array.isArray(data)) {
        data.forEach((item, index) => {
          appendFormData(formData, item, `${parentKey}[${index}]`);
        });
        return;
      }

      if (typeof data === "object") {
        Object.keys(data).forEach((key) => {
          const value = data[key];
          const newKey = parentKey ? `${parentKey}[${key}]` : key;

          appendFormData(formData, value, newKey);
        });
        return;
      }

      // primitive
      formData.append(parentKey, String(data));
    };

    // 🔥 build formData properly
    appendFormData(formData, data);

    // 🔍 debug (optional, remove later)
    // for (let [k, v] of formData.entries()) {
    //   console.log(k, v);
    // }

    return apiUpload
      .put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
          if (onProgress && event.total) {
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
  submitQuis: async (payload) => {
    const url = sprintf(URL_TRAINING_SUBMIT_QUIS);

    return api
      .post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res?.data?.data);
  },
};
