import { Model } from "mongoose";
import { ILessonOutPopulateDTO } from "../../../domain/dtos";
import { ILesson } from "../../databases/interfaces";
import { MaterialType } from "../../../domain/types";
import { ILessonRepository } from "../interfaces";
import { BaseRepository } from "./base-repository";

export class LessonRepository
  extends BaseRepository<ILesson>
  implements ILessonRepository
{
  constructor(model: Model<ILesson>) {
    super(model);
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

  async findByIdPopulate(id: string): Promise<ILessonOutPopulateDTO | null> {
    try {
      const lesson = await this.model
        .findById(id)
        .populate("materials", "title type description duration");

      if (!lesson) return null;

      const materials = lesson.materials.map((item) => {
        const { _id, title, description, duration, type } = item as unknown as {
          title: string;
          _id: string;
          description: string;
          duration: number;
          type: MaterialType;
        };
        return {
          id: _id,
          title,
          description,
          duration,
          type,
        };
      });

      return {
        id: lesson._id.toString(),
        title: lesson.title,
        mentorId: lesson.mentorId.toString(),
        description: lesson.description ?? undefined,
        materials,
      };
    } catch (error) {
      console.error("Error while find the course:", error);
      throw new Error("Course fetch failed");
    }
  }
}
