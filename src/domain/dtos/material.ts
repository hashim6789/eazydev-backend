import { MaterialType, Role } from "../types";
import { IUserDetailsDTO } from "./user/user.dto";

export interface QueryMaterial {
  type: MaterialType | "all";
  search: string;
  page: string;
  limit: string;
  mentorId?: string;
}

export interface Material {
  id: string;
  title: string;
  mentorId: string;
  description: string;
  type: MaterialType;
  duration: number;
  fileKey: string;
  createdAt: number;
  updatedAt: number;
}

export type ICreateMaterialRequestDTO = Omit<
  Material,
  "id" | "createdAt" | "updatedAt"
> & { lessonId: string };
export type ICreateMaterialInDTO = Omit<ICreateMaterialRequestDTO, "lessonId">;

export type IMaterialOutDTO = Omit<Material, "createdAt" | "updatedAt">;

// IMaterialDetailOutDTO,
export type IUpdateMaterialRequestDTO = {
  materialId: string;
  title: string;
  mentorId: string;
  description: string;
  type: MaterialType;
  duration: number;
  fileKey: string;
};
export type IUpdateMaterialInDTO = {
  title: string;
  mentorId: string;
  description: string;
  type: MaterialType;
  duration: number;
  fileKey: string;
};

export interface IGetAllMaterialRequestDTO {
  query: QueryMaterial;
  userId: string;
  role: Role;
}
export interface IGetMaterialRequestDTO {
  materialId: string;
  userId: string;
  role: Role;
}

export type IMaterialPopulateMentorDTO = Omit<IMaterialOutDTO, "mentorId"> & {
  mentor: IUserDetailsDTO;
};
