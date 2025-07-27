import { Types } from "mongoose";
import { IProgress } from "../interfaces";
import { IProgressOutDTO } from "../../../domain/dtos";
import { ProgressEntity } from "../../../domain/entities/progress";

export const mapProgressToDocument = (
  entity: ProgressEntity
): Partial<IProgress> => {
  return {
    mentorId: new Types.ObjectId(entity.mentorId),
    userId: new Types.ObjectId(entity.userId),
    courseId: new Types.ObjectId(entity.courseId),
    completedLessons: entity.completedLessons.map(
      (lessonId) => new Types.ObjectId(lessonId)
    ),
    completedMaterials: entity.completedMaterials.map(
      (materialId) => new Types.ObjectId(materialId)
    ),
    completedDate:
      entity.completedDate !== null ? new Date(entity.completedDate) : null,
    progress: entity.progress,
    isCourseCompleted: entity.isCourseCompleted,
  };
};

export function mapProgressToDTO(material: IProgress): IProgressOutDTO {
  return {
    id: material._id.toString(),
    userId: material.userId.toString(),
    mentorId: material.mentorId.toString(),
    courseId: material.courseId.toString(),
    completedLessons: material.completedLessons.map((lessonId) =>
      lessonId.toString()
    ),
    completedMaterials: material.completedMaterials.map((materialId) =>
      materialId.toString()
    ),
    completedDate:
      material.completedDate !== null ? material.completedDate.getTime() : null,
    isCourseCompleted: material.isCourseCompleted,
    progress: material.progress,
  };
}
