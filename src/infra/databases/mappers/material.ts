import { Types } from "mongoose";
import { MaterialEntity } from "../../../domain/entities";
import { IMaterial } from "../interfaces";
import { IMaterialOutDTO } from "../../../domain/dtos/material";

export const mapMaterialToDocument = (
  entity: MaterialEntity
): Partial<IMaterial> => {
  return {
    title: entity.title,
    mentorId: new Types.ObjectId(entity.mentorId),
    description: entity.description,
    type: entity.type,
    duration: entity.duration,
    fileKey: entity.fileKey,
  };
};

export function mapMaterialToDTO(material: IMaterial): IMaterialOutDTO {
  return {
    id: material._id.toString(),
    title: material.title,
    mentorId: material.mentorId.toString(),
    description: material.description,
    type: material.type,
    duration: material.duration,
    fileKey: material.fileKey,
  };
}
