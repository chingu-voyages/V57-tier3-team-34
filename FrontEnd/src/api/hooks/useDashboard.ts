import { useQuery } from "@tanstack/react-query";
import { generalServices } from "../services/generalService";

export const useDashboard = () => {
  return useQuery({
    queryKey: ["getStats"],
    queryFn: generalServices.getStats,
  });
};
