import {
  URL_INTERNAL_QUESTIONNAIRE,
  URL_INTERNAL_QUESTIONNAIRE_RESULT,
  URL_INTERNAL_QUESTIONNAIRE_TRAINING,
  URL_INTERNAL_TRAINEE_LIST,
} from "@/constants/urls";
import { api } from "@/utils/api";
import { stringifyQueryParam } from "@/utils/common";
import { sprintf } from "sprintf";

export const _generateQuestionerData = (values) => {
  let data = {};

  Object.entries(values).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      data[key] = value;
    }
  });

  return data;
};

export const questionnaireAdminService = {
  getList: async ({ params }) => {
    const queryParamString = stringifyQueryParam(params);
    const url = sprintf(URL_INTERNAL_QUESTIONNAIRE, {
      params: queryParamString,
    });

    return api.get(url).then((res) => {
      return res?.data;
    });
  },
  getListTraining: async ({ params }) => {
    const queryParamString = stringifyQueryParam(params);
    const url = sprintf(URL_INTERNAL_QUESTIONNAIRE_TRAINING, {
      params: queryParamString,
    });

    return api.get(url).then((res) => {
      return res?.data;
    });
  },
  getListResult: async ({ params }) => {
    const queryParamString = stringifyQueryParam(params);
    const url = sprintf(URL_INTERNAL_QUESTIONNAIRE_RESULT, {
      params: queryParamString,
    });

    return api.get(url).then((res) => {
      return res?.data;
    });
  },
  getOptionList: async () => {
    const url = sprintf(URL_INTERNAL_TRAINEE_LIST);

    return api.get(url).then((res) => {
      const transformed = res?.data?.data.map((user) => ({
        key: user.id,
        label: user.full_name,
      }));
      return transformed;
    });
  },
  createQuestionnaire: async (payload) => {
    const url = sprintf(URL_INTERNAL_QUESTIONNAIRE, { params: "" });

    return api
      .post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res?.data?.data);
  },
  assignQuestionnaire: async (payload) => {
    const url = sprintf(URL_INTERNAL_QUESTIONNAIRE_TRAINING, { params: "" });

    return api
      .post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res?.data?.data);
  },
  updateQuestionnaire: async (payload) => {
    const url = sprintf(URL_INTERNAL_QUESTIONNAIRE, { params: "" });

    return api
      .put(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res?.data?.data);
  },
};
