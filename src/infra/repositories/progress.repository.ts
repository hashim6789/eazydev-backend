import { Model } from "mongoose";
import { IProgress } from "../databases/interfaces";
import { IProgressRepository } from "../../app/repositories";
import { IProgressOutDTO, QueryProgress } from "../../domain/dtos";
import { ProgressEntity } from "../../domain/entities/progress";
import { PaginationDTO } from "../../domain/dtos/pagination.dtos";

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
}
