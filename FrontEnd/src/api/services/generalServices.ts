import type { AxiosResponse } from "axios";
import { api } from "../config/apiClient";

export const generalServices = {
  async getPosts(): Promise<AxiosResponse> {
    const response = await api.get("/extras/get-political-posts");
    return response.data;
  },

  async getStats(): Promise<AxiosResponse> {
    const response = await api.get("/party/get-stats");
    return response.data;
  },

  async getResults(): Promise<AxiosResponse> {
    const response = await api.get("/extras/election-results");
    return response.data;
  },
};
