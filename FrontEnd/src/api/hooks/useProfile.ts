import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getMyProfile } from "../queries/user";
import type { User } from "../types";

export const useProfile = (options?: UseQueryOptions<User, Error>) => {
	return useQuery({
		queryKey: ["userProfile"],
		queryFn: getMyProfile,
		staleTime: 1000 * 60 * 10, //10 Minutes
		retry: 1,
		...options,
	});
};
