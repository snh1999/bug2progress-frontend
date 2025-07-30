import { BASE_URL } from "@/app.constants";
import { getBearerToken } from "@/components/auth/auth.actions";
import axios, { AxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: BASE_URL,
});

export const apiWithAuth = async () =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: await getBearerToken(),
    },
  });

export const GetRequest = async (url: string, config?:  AxiosRequestConfig<any>) => {
  const api = await apiWithAuth();
  const response = await api.get(url, config);
  return response.data;
};

export const PostRequest = async (url: string, data: any, config?:  AxiosRequestConfig<any>) => {
  const api = await apiWithAuth();
  const response = await api.post(url, data, config);
  return response.data;
};

export const DeleteRequest = async (url: string) => {
  const api = await apiWithAuth();
  const response = await api.delete(url);
  return response.data;
};

export const PatchRequest = async (url: string, data: any, config?:  AxiosRequestConfig<any>) => {
  const api = await apiWithAuth();
  const response = await api.patch(url, data, config);
  return response.data;
};
