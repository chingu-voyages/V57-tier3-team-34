import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { type CandidateUpdateData, type CandidateFormInput } from "../types";
import { candidateServices } from "../services/candidateServices";

export const useAddCandidate = () => {
  return useMutation<AxiosResponse, Error, CandidateFormInput>({
    mutationFn: candidateServices.addCandidate,
  });
};

export const useUpdateCandidate = () => {
  return useMutation<AxiosResponse, Error, CandidateUpdateData>({
    mutationFn: candidateServices.updateCandidate,
  });
};
