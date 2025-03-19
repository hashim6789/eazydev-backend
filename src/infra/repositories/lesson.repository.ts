import { Model } from "mongoose";
import { ILessonRepository } from "../../app/repositories";
import { ICreateLessonInDTO, ILessonOutDTO } from "../../domain/dtos";
import { ILesson } from "../databases/interfaces";

export class LessonRepository implements ILessonRepository {
  private model: Model<ILesson>;

  constructor(model: Model<ILesson>) {
    this.model = model;
  }
  async create(data: ICreateLessonInDTO): Promise<ILessonOutDTO> {
    try {
      const createData = new this.model({
        title: data.title,
        description: data.description,
        mentorId: data.mentorId,
        materials: data.materials,
      });
      const lesson = await createData.save();

      return {
        id: lesson._id.toString(),
        title: lesson.title,
        mentorId: lesson.mentorId.toString(),
        description: lesson.description,
        materials: lesson.materials.map((item) => item.toString()),
      };
    } catch (error) {
      console.error("Error while creating lesson:", error);
      throw new Error("Lesson creation failed");
    }
  }

  async addMaterialToLesson(
    lessonId: string,
    materialId: string
  ): Promise<void> {
    try {
      await this.model.findByIdAndUpdate(lessonId, {
        $push: { materials: materialId },
      });
    } catch (error) {
      console.error("Error while adding lesson to course:", error);
      throw new Error("Lesson added to course failed");
    }
  }
}
