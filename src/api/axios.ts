import {BASE_URL} from "@/app.constants";
import {getBearerToken} from "@/components/auth/auth.actions";
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

export const GetRequest = async (url: string) => {
    const api = await apiWithAuth();
    return api.get(url);
};

export const PostRequest = async (url: string, data: any) => {
    const api = await apiWithAuth();
    return api.post(url, data);
};

export const PutRequest = async (url: string, data: any) => {
    const api = await apiWithAuth();
    return api.put(url, data);
};

export const DeleteRequest = async (url: string) => {
    const api = await apiWithAuth();
    return api.delete(url);
};

export const PatchRequest = async (url: string, data: any) => {
    const api = await apiWithAuth();
    return api.patch(url, data);
};

