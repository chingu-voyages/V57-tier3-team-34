import { api } from "../config/apiClient";

export const candidateServices = {
  async getCandidates(page: number = 1, limit: number = 5) {
    const response = await api.get("/party/candidates", {
      params: {
        page,
        limit,
      },
    });
    return response.data.data;
  },
};
