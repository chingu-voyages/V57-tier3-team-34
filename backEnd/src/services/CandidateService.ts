import prisma from "@/config/db.config";
import Paginate from "@/helpers/Pagination";
import { Roles } from "@prisma/client";

export const getCandidateService = async (page: number, limit: number) => {
  const candidate = await Paginate({
    page: page,
    limit: limit,
    model: prisma.user,
    conditions: { userType: Roles.CANDIDATE },
  });

  return candidate;
};
