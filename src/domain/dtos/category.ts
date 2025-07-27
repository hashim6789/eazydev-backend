import { ICategory } from "../../infra/databases/interfaces";
import { Role } from "../types";
import { CategoryStatus } from "../types/category";

export interface ICategoryOutDTO {
  id: string;
  title: string;
  isListed: boolean;
}

export type ICreateCategoryInDTO = Omit<ICategoryOutDTO, "id">;
export type IUpdateCategoryIntDTO = Omit<ICategoryOutDTO, "id" | "isListed">;

export type ICreateCategoryRequestDTO = Omit<
  ICategoryOutDTO,
  "isListed" | "id"
> & {
  adminId: string;
};

export type IUpdateListCategoryRequestDTO = {
  categoryId: string;
  change: boolean;
  adminId: string;
};

export type IUpdateCategoryRequestDTO = {
  categoryId: string;
  title: string;
  adminId: string;
};

export interface QueryCategory {
  role: Role;
  search: string;
  page: string;
  limit: string;
  status: CategoryStatus | "all";
}

export function mapCategoryToDTO(category: ICategory): ICategoryOutDTO {
  return {
    id: category._id.toString(),
    title: category.title,
    isListed: category.isListed,
  };
}
