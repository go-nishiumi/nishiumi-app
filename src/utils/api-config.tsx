import axios, { AxiosRequestConfig, isAxiosError } from "axios";

export const apiCommonUrl =
  "https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1";

export const apiPrefecturesUrl = `/prefectures`;
export const apiPopulationsUrl = `/population/composition/perYear`;

export const apiConfig: AxiosRequestConfig = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "X-API-KEY": "8FzX5qLmN3wRtKjH7vCyP9bGdEaU4sYpT6cMfZnJ",
  },
};

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (isAxiosError(err)) {
      const { status, message } = err;
      console.dir(`${status} : ${message}`);
    } else {
      console.dir("Unknown Error: ", err);
    }
  },
);
