import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { type CandidateUpdateData, type CandidateFormInput } from "../types";
import { candidateServices } from "../services/candidateServices";

export const useAddCandidate = () => {
	return useMutation<AxiosResponse, Error, CandidateFormInput>({
		mutationFn: candidateServices.addCandidate,
	});
};

export const useUpdateCandidate = () => {
	return useMutation<
		AxiosResponse,
		Error,
		{ id: number | string; data: CandidateUpdateData }
	>({
		mutationFn: ({ id, data }) =>
			candidateServices.updateCandidate({ id, data }),
	});
};

export const useResetCandidate = (candidateId: number | null) => {
	return useQuery({
		queryKey: ["resetCandidate", candidateId],
		queryFn: () => candidateServices.resetCandidate(candidateId),
		enabled: false,
	});
};
