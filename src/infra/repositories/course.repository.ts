import { Model } from "mongoose";
import { ICourseRepository } from "../../app/repositories";
import { ICreateCourseInDTO, ICourseOutDTO } from "../../domain/dtos";
import { ICourse } from "../databases/interfaces";

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
        mentorId: course.mentorId?.toString() || "",
        categoryId: course.categoryId?.toString() || "",
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
}
