import axios, { AxiosResponse } from "axios";
import { apiCommonUrl, apiPopulationsUrl, apiConfig, apiPrefecturesUrl } from "../utils/api-config";

export const getPrefectures = async () => {
  try {
    apiConfig.url = `${apiCommonUrl}${apiPrefecturesUrl}`;
    const result: AxiosResponse = await axios(apiConfig);
    return result.data.result;
  } catch {
    console.log('error');
  }
};

export const getPopulations = async (prefCode: string) => {
  try {
    apiConfig.url = `${apiCommonUrl}${apiPopulationsUrl}`;
    apiConfig.params = {
      prefCode: prefCode,
    };
    const result: AxiosResponse = await axios(apiConfig);
    return result.data.result.data[0].data;
  } catch {
    console.log('error');
  }
};
