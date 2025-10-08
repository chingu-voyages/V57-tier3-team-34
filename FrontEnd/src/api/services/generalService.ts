import type { AxiosResponse } from "axios";
import { api } from "../config/apiClient";

export const generalServices = {
	async getPosts(): Promise<AxiosResponse> {
		const response = await api.get("/extras/get-political-posts");
		return response.data;
	},
};
