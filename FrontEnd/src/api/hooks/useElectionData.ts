import { useQuery } from "@tanstack/react-query";
import { electionServices } from "../services/electionServices";

export const useElectionData = () => {
	return useQuery({
		queryKey: ["getElections"],
		queryFn: electionServices.getElections,
	});
};
