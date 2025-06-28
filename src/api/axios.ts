import { BASE_URL } from "@/app.constants";
import { getBearerToken } from "@/components/auth/auth.actions";
import axios from "axios";

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
