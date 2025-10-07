import { useQuery } from "@tanstack/react-query";
import { candidateServices } from "../services/candidateServices";

export const useCandidates = (page: number = 1, limit: number = 5) => {
  return useQuery({
    queryKey: ["getCandidates", page, limit],
    queryFn: () => candidateServices.getCandidates(page, limit),
    staleTime: 1000 * 60, //1 minute
  });
};
