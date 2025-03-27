import mongoose, { Model, ObjectId, PipelineStage } from "mongoose";
import { IProgress } from "../databases/interfaces";
import { IProgressRepository } from "../../app/repositories";
import {
  IProgressOutDTO,
  PopulatedProgressLearningsDTO,
  QueryProgress,
} from "../../domain/dtos";
import { ProgressEntity } from "../../domain/entities/progress";
import { PaginationDTO } from "../../domain/dtos/pagination.dtos";
import {
  analyzeAllCoursePerformancePipeline,
  mentorPerformanceAnalyzePipeline,
  ProgressPopulatedPipeline,
} from "../pipelines";
import { CoursePerformanceData } from "../../domain/types";

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
        mentorId: data.mentorId,
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
        mentorId: progress.mentorId.toString(),
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

  async findAllByUserId(
    { page = "1", limit = "5" }: QueryProgress,
    userId: string
  ): Promise<PaginationDTO> {
    try {
      // Pagination logic
      const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
      const limitParsed = parseInt(limit, 10);

      // Fetch progresses with query, pagination, and sorting
      const progresses = await this.model
        .find({ userId })
        .populate("courseId", "title thumbnail")
        .populate("mentorId", "firstName lastName profilePicture")
        .skip(skip)
        .limit(limitParsed)
        .lean();

      // Count total documents matching query
      const total = await this.model.countDocuments({ userId });

      // Construct the pagination response
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
      const result = (await this.model.aggregate(
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

  async findById(id: string): Promise<IProgressOutDTO | null> {
    try {
      const progress = await this.model.findById(id);
      if (!progress) return null;

      return {
        id: progress._id.toString(),
        userId: progress.userId.toString(),
        mentorId: progress.mentorId.toString(),
        courseId: progress.courseId.toString(),
        completedLessons: progress.completedLessons.map((item) =>
          item.toString()
        ),
        completedMaterials: progress.completedMaterials.map((item) =>
          item.toString()
        ),
        isCourseCompleted: progress.isCourseCompleted,
        progress: progress.progress,
        completedDate: progress.completedDate
          ? progress.completedDate.getTime()
          : null,
      };
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
      // Step 1: Add materialId to completedMaterials
      const result = await this.model.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            completedMaterials: new mongoose.Types.ObjectId(materialId),
          },
        },
        { new: true }
      );
      // .populate("courseId");

      if (!result) {
        throw new Error("Progress document not found");
      }
      const courseId = result.courseId;

      // Step 2: Populate course and lessons
      const progress = await this.model
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

      const course = progress.courseId as any; // Assuming courseId is populated as a Course type
      const completedMaterials = progress.completedMaterials as ObjectId[];

      // Step 3: Check if lessons are completed
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
      // Step 4: Update completedLessons in Progress document
      progress.completedLessons = Array.from(completedLessons).map(
        (id) =>
          new mongoose.Types.ObjectId(
            id
          ) as any as mongoose.Schema.Types.ObjectId
      );

      // Step 5: Update course completion status
      progress.isCourseCompleted =
        progress.completedLessons.length === course.lessons.length;

      // Step 6: Calculate and update progress
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
      const dashboardData = await this.model.aggregate(
        mentorPerformanceAnalyzePipeline(mentorId)
      );

      return dashboardData[0]; // Since $fac
    } catch (error) {
      console.error("Error while get mentor analyze progresses:", error);
      throw new Error("Progress analysis fetch failed");
    }
  }

  async analyzeAllCoursePerformance(): Promise<CoursePerformanceData[]> {
    try {
      // Execute the aggregation pipeline
      const coursePerformanceData = await this.model.aggregate(
        analyzeAllCoursePerformancePipeline()
      );
      return coursePerformanceData as CoursePerformanceData[];
    } catch (error) {
      console.error("Error while get admin analyze course performance:", error);
      throw new Error("Progress analysis course performance failed");
    }
  }
}
