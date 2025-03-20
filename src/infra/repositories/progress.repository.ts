import { Model } from "mongoose";
import { IProgress } from "../databases/interfaces";
import { IProgressRepository } from "../../app/repositories";
import { IProgressOutDTO } from "../../domain/dtos";
import { ProgressEntity } from "../../domain/entities/progress";

export class ProgressRepository implements IProgressRepository {
  private model: Model<IProgress>;

  constructor(model: Model<IProgress>) {
    this.model = model;
  }

  async create(data: ProgressEntity): Promise<IProgressOutDTO> {
    try {
      const createData = new this.model({
        userId: data.userId,
        courseId: data.courseId,
        completedLessons: data.completedLessons,
        completedMaterials: data.completedMaterials,
        isCourseCompleted: data.isCourseCompleted,
        progress: data.progress,
        completedDate: data.completedDate,
      });
      const progress = await createData.save();

      return {
        id: progress._id.toString(),
        userId: progress.userId.toString(),
        courseId: progress.courseId.toString(),
        completedLessons: [],
        completedMaterials: [],
        isCourseCompleted: progress.isCourseCompleted,
        progress: progress.progress,
        completedDate: null,
      };
    } catch (error) {
      console.error("Error while creating progress:", error);
      throw new Error("Purchase creation failed");
    }
  }
}
