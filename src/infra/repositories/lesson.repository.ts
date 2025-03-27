import { Model } from "mongoose";
import { ILessonRepository } from "../../app/repositories";
import {
  ICreateLessonInDTO,
  ILessonOutDTO,
  ILessonOutPopulateDTO,
  IUpdateLessonRequestDTO,
} from "../../domain/dtos";
import { ILesson } from "../databases/interfaces";
import { MaterialType } from "../../domain/types";

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

      // const { firstName, lastName, profilePicture } =
      //   course.mentorId as unknown as {
      //     firstName: string;
      //     lastName: string;
      //     profilePicture: string;
      //   };
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

  async update(
    id: string,
    data: IUpdateLessonRequestDTO
  ): Promise<ILessonOutDTO | null> {
    try {
      const lesson = await this.model.findByIdAndUpdate(id, data);
      if (!lesson) return null;

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
}
