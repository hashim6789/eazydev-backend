import { Role } from "../role.dtos";

export type MaterialType = "video" | "reading";

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
>;
export type IMaterialOutDTO = Omit<Material, "createdAt" | "updatedAt">;

// IMaterialDetailOutDTO,
export type IUpdateMaterialDTO = Partial<ICreateMaterialRequestDTO>;

export interface IGetAllMaterialRequestDTO {
  query: QueryMaterial;
  userId: string;
  role: Role;
}
