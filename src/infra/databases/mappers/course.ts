import { Types } from "mongoose";
import { CourseEntity } from "../../../domain/entities";
import { ICourse } from "../interfaces";
import { ICourseOutDTO } from "../../../domain/dtos";

export const mapCourseToDocument = (entity: CourseEntity): Partial<ICourse> => {
  return {
    title: entity.title,
    mentorId: new Types.ObjectId(entity.mentorId),
    categoryId: new Types.ObjectId(entity.categoryId),
    lessons: entity.lessons.map((lessonId) => new Types.ObjectId(lessonId)),
    description: entity.description,
    thumbnail: entity.thumbnail,
    price: entity.price,
  };
};

export function mapCourseToDTO(course: ICourse): ICourseOutDTO {
  return {
    id: course._id.toString(),
    title: course.title,
    mentorId: course.mentorId.toString(),
    categoryId: course.categoryId.toString(),
    description: course.description,
    lessons: course.lessons.map((item) => item.toString()),
    thumbnail: course.thumbnail,
    price: course.price,
    status: course.status,
  };
}
