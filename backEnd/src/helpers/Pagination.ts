import type { Request, Response } from "express";
import { extend } from "zod/v4/core/util.cjs";

type PrismaModel = {
  findMany: Function;
  count: Function;
};

export default async function Paginate<T extends PrismaModel>(options: {
  page: number;
  limit: number;
  model: T;
  conditions?: {} | null;
  include?: {} | null;
  orderBy?: {} | null;
}) {
  try {
    const records = await options.model.findMany({
      take: options.limit,
      skip: (options.page - 1) * options.limit,
      where: options.conditions || undefined,
      include: options.include || undefined,
      orderBy: options.orderBy || undefined,
    });

    const totalCount = await options.model.count({
      where: options.conditions || undefined,
    });

    return {
      data: records,
      pagination: {
        page: options.page,
        limit: options.limit,
        totalRecords: totalCount,
        pages: Math.ceil(totalCount / options.limit),
      },
    };
  } catch (error) {
    throw error;
  }
}
