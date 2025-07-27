import { Types } from "mongoose";
import { LessonEntity } from "../../../domain/entities";
import { ILesson } from "../interfaces";
import { ILessonOutDTO } from "../../../domain/dtos";

export const mapLessonToDocument = (entity: LessonEntity): Partial<ILesson> => {
  return {
    title: entity.title,
    mentorId: new Types.ObjectId(entity.mentorId),
    description: entity.description,
    materials: entity.materials.map((material) => new Types.ObjectId(material)),
  };
};

export function mapLessonToDTO(course: ILesson): ILessonOutDTO {
  return {
    id: course._id.toString(),
    title: course.title,
    mentorId: course.mentorId.toString(),
    description: course.description,
    materials: course.materials.map((item) => item.toString()),
  };
}
