import { useQuery } from "@tanstack/react-query";
import { generalServices } from "../services/generalService";

export const usePosts = (enabled: boolean) => {
	return useQuery({
		queryKey: ["getPosts"],
		queryFn: generalServices.getPosts,
		staleTime: 1000 * 60 * 10, //10 Minutes
		enabled,
	});
};
