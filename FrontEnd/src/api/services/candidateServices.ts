import type { AxiosResponse } from "axios";
import { api } from "../config/apiClient";
import type { CandidateFormInput, CandidateUpdateData } from "../types";

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

  async addCandidate(data: CandidateFormInput): Promise<AxiosResponse> {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("position", data.post.toString());
    formData.append("bio", data.bio);

    if (data.email) {
      formData.append("email", data.email);
    }

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    const response = await api.post("/party/candidate", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  async updateCandidate({
    id,
    data,
  }: {
    id: number | string;
    data: CandidateUpdateData;
  }): Promise<AxiosResponse> {
    const response = await api.put(`/party/candidate/${id}`, data);
    return response.data;
  },

  async resetCandidate(id: number | null): Promise<AxiosResponse> {
    const response = await api.put(`party/candidate/${id}/reset`);
    return response;
  },
};
