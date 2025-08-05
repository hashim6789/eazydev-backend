import mongoose, { Model, Types } from "mongoose";
import { IProgress } from "../../databases/interfaces";
import {
  IProgressOutDTO,
  PopulatedProgressLearningsDTO,
  QueryProgress,
} from "../../../domain/dtos";
import { PaginationDTO } from "../../../domain/dtos";
import {
  analyzeAllCoursePerformancePipeline,
  mentorPerformanceAnalyzePipeline,
  ProgressPopulatedPipeline,
} from "../../pipelines";
import { CoursePerformanceData } from "../../../domain/types";
import { IProgressRepository } from "../interfaces";
import { BaseRepository } from "./base-repository";

export class ProgressRepository
  extends BaseRepository<IProgress>
  implements IProgressRepository
{
  constructor(model: Model<IProgress>) {
    super(model);
  }

  async findAllByUserId(
    { page = "1", limit = "5" }: QueryProgress,
    userId: string
  ): Promise<PaginationDTO> {
    try {
      const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
      const limitParsed = parseInt(limit, 10);

      const progresses = await this._model
        .find({ userId })
        .populate("courseId", "title thumbnail")
        .populate("mentorId", "firstName lastName profilePicture")
        .skip(skip)
        .limit(limitParsed)
        .lean();

      const total = await this._model.countDocuments({ userId });

      return {
        body: progresses.map((progress) => {
          const {
            _id: courseId,
            title,
            thumbnail,
          } = progress.courseId as unknown as {
            title: string;
            _id: string;
            thumbnail: string;
          };
          const {
            _id: mentorId,
            firstName,
            lastName,
            profilePicture,
          } = progress.mentorId as unknown as {
            firstName: string;
            lastName: string;
            profilePicture: string;
            _id: string;
          };

          return {
            id: progress._id.toString(),
            mentor: {
              id: mentorId,
              firstName,
              lastName,
              profilePicture,
            },
            course: {
              id: courseId,
              title,
              thumbnail,
            },
            completedLessons: progress.completedLessons.map((item) =>
              item.toString()
            ),
            completedMaterials: progress.completedMaterials.map((item) =>
              item.toString()
            ),
            isCourseCompleted: progress.isCourseCompleted,
            progress: progress.progress,
            completedDate: progress.completedDate,
          };
        }),
        total,
        page: parseInt(page, 10),
        last_page: Math.ceil(total / limitParsed),
      };
    } catch (error) {
      console.error("Error while fetching progresses:", error);
      throw new Error("Course fetch failed");
    }
  }

  async findByIdPopulate(id: string): Promise<PopulatedProgressLearningsDTO> {
    try {
      const result = (await this._model.aggregate(
        ProgressPopulatedPipeline(id)
      )) as PopulatedProgressLearningsDTO[];

      const progress = result[0];

      const userId = progress.userId.toString();
      return { ...progress, userId };
    } catch (error) {
      console.error("Error while fetching progresses:", error);
      throw new Error("Course fetch failed");
    }
  }

  async updateProgress(
    id: string,
    materialId: string
  ): Promise<IProgressOutDTO | null> {
    try {
      const result = await this._model.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            completedMaterials: new mongoose.Types.ObjectId(materialId),
          },
        },
        { new: true }
      );

      if (!result) {
        throw new Error("Progress document not found");
      }
      const courseId = result.courseId;

      const progress = await this._model
        .findById(id)
        .populate({
          path: "courseId",
          populate: {
            path: "lessons",
            model: "Lessons",
            populate: {
              path: "materials",
              model: "Materials",
            },
          },
        })
        .exec();

      if (!progress) {
        throw new Error("Progress document not found after update");
      }

      const course = progress.courseId as any;
      const completedMaterials =
        progress.completedMaterials as Types.ObjectId[];

      // Step 1: Check if lessons are completed
      const completedLessons = new Set(
        progress.completedLessons.map((id) => id.toString())
      );
      for (const lesson of course.lessons) {
        const allMaterialsCompleted = lesson.materials.every((material: any) =>
          completedMaterials.some(
            (completedMaterial) =>
              completedMaterial.toString() === material._id.toString()
          )
        );

        if (allMaterialsCompleted) {
          completedLessons.add(lesson._id.toString());
        }
      }
      // Step 2: Update completedLessons in Progress document
      progress.completedLessons = Array.from(completedLessons).map(
        (id) => new Types.ObjectId(id) as any as Types.ObjectId
      );

      // Step 3: Update course completion status
      progress.isCourseCompleted =
        progress.completedLessons.length === course.lessons.length;

      // Step 4: Calculate and update progress
      const totalMaterialsCount = course.lessons.reduce(
        (acc: number, lesson: any) => acc + lesson.materials.length,
        0
      );
      const completedMaterialsCount = progress.completedMaterials.length;
      progress.progress = (completedMaterialsCount / totalMaterialsCount) * 100;

      const updatedProgress = await progress.save();

      return {
        id: updatedProgress._id.toString(),
        userId: updatedProgress.userId.toString(),
        mentorId: updatedProgress.mentorId.toString(),
        courseId: courseId.toString(),
        completedLessons: updatedProgress.completedLessons.map((item) =>
          item.toString()
        ),
        completedMaterials: updatedProgress.completedMaterials.map((item) =>
          item.toString()
        ),
        isCourseCompleted: updatedProgress.isCourseCompleted,
        progress: updatedProgress.progress,
        completedDate: updatedProgress.completedDate
          ? updatedProgress.completedDate.getTime()
          : null,
      };
    } catch (error) {
      console.error("Error while update progresses:", error);
      throw new Error("Course fetch failed");
    }
  }

  async mentorAnalysis(mentorId: string): Promise<any> {
    try {
      const dashboardData = await this._model.aggregate(
        mentorPerformanceAnalyzePipeline(mentorId)
      );

      return dashboardData[0];
    } catch (error) {
      console.error("Error while get mentor analyze progresses:", error);
      throw new Error("Progress analysis fetch failed");
    }
  }

  async analyzeAllCoursePerformance(): Promise<CoursePerformanceData[]> {
    try {
      const coursePerformanceData = await this._model.aggregate(
        analyzeAllCoursePerformancePipeline()
      );
      return coursePerformanceData as CoursePerformanceData[];
    } catch (error) {
      console.error("Error while get admin analyze course performance:", error);
      throw new Error("Progress analysis course performance failed");
    }
  }
}
