import { string, z } from "zod";
import { ObjectIdSchema } from "./common";
import { RoleTypes } from "../enums";
import { MaterialType } from "../types";

export const UploadMaterialRequestSchema = z.object({
  fileName: z.string().min(1, "Filename is required"),
  fileType: z.string().min(1, "File type is required"),
  materialType: z.enum(["reading", "video"]),
  userId: ObjectIdSchema,
  role: z.nativeEnum(RoleTypes),
});

export interface IUploadMaterialRequestDTO {
  fileName: string;
  fileType: string;
  materialType: MaterialType;
}
