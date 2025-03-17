import { Model } from "mongoose";
import { ICourseRepository } from "../../app/repositories";
import {
  ICreateCourseInDTO,
  ICourseOutDTO,
  IUpdateCourseInDTO,
} from "../../domain/dtos";
import { ICourse } from "../databases/interfaces";
import { CourseStatus } from "../../domain/types";

export class CourseRepository implements ICourseRepository {
  private model: Model<ICourse>;

  constructor(model: Model<ICourse>) {
    this.model = model;
  }
  async create(data: ICreateCourseInDTO): Promise<ICourseOutDTO> {
    try {
      const createData = new this.model(data);
      const course = await createData.save();

      return {
        id: course._id.toString(),
        title: course.title,
        mentorId: course.mentorId.toString(),
        categoryId: course.categoryId.toString(),
        description: course.description ?? undefined,
        lessons: [],
        thumbnail: course.thumbnail,
        price: course.price,
        status: course.status,
      };
    } catch (error) {
      console.error("Error while creating course:", error);
      throw new Error("Course creation failed");
    }
  }

  async addLessonToCourse(courseId: string, lessonId: string): Promise<void> {
    try {
      await this.model.findByIdAndUpdate(courseId, {
        $push: { lessons: lessonId },
      });
    } catch (error) {
      console.error("Error while adding lesson to course:", error);
      throw new Error("Lesson added to course failed");
    }
  }

  async updateStatusOfCourse(
    courseId: string,
    newStatus: CourseStatus
  ): Promise<boolean> {
    try {
      const course = await this.model.findByIdAndUpdate(courseId, {
        status: newStatus,
      });

      return course ? true : false;
    } catch (error) {
      console.error("Error while update status of course:", error);
      throw new Error("Course status update failed");
    }
  }

  async findById(id: string): Promise<ICourseOutDTO | null> {
    try {
      const course = await this.model.findById(id);
      if (!course) return null;
      return {
        id: course._id.toString(),
        title: course.title,
        mentorId: course.mentorId.toString(),
        categoryId: course.categoryId.toString(),
        description: course.description ?? undefined,
        lessons: course.lessons.map(toString),
        thumbnail: course.thumbnail,
        price: course.price,
        status: course.status,
      };
    } catch (error) {
      console.error("Error while find the course:", error);
      throw new Error("Course fetch failed");
    }
  }

  async update(
    id: string,
    data: IUpdateCourseInDTO
  ): Promise<ICourseOutDTO | null> {
    try {
      const course = await this.model.findByIdAndUpdate(id, data);
      if (!course) return null;
      return {
        id: course._id.toString(),
        title: course.title,
        mentorId: course.mentorId.toString(),
        categoryId: course.categoryId.toString(),
        description: course.description ?? undefined,
        lessons: course.lessons.map(toString),
        thumbnail: course.thumbnail,
        price: course.price,
        status: course.status,
      };
    } catch (error) {
      console.error("Error while find the course:", error);
      throw new Error("Course fetch failed");
    }
  }
}
