import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.9:8080/api/v1",
});

api.interceptors.request.use((config) => {
  const basicToken = "Basic YWRtaW46MTIzNDU2";

  config.headers = {
    ...(config.headers as Record<string, string> | undefined),
    Authorization: basicToken,
    "Content-Type": "application/json",
  } as any;

  return config;
});

export const CURRENT_USER_ID = 1;

export default api;
