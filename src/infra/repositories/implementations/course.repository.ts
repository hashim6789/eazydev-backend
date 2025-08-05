import { Model } from "mongoose";
import {
  QueryCourse,
  ICourseOutPopulateDTO,
  ICourseSimpleOutDTO,
} from "../../../domain/dtos";
import { ICourse } from "../../databases/interfaces";
import { CourseStatus, MaterialType } from "../../../domain/types";
import { PaginationDTO } from "../../../domain/dtos";
import { mentorRevenueAnalysisPipeline } from "../../pipelines/course";
import { ICourseRepository } from "../interfaces";
import { BaseRepository } from "./base-repository";

export class CourseRepository
  extends BaseRepository<ICourse>
  implements ICourseRepository
{
  constructor(model: Model<ICourse>) {
    super(model);
  }

  async addLessonToCourse(courseId: string, lessonId: string): Promise<void> {
    try {
      await this._model.findByIdAndUpdate(courseId, {
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
  ): Promise<ICourseSimpleOutDTO | null> {
    try {
      const course = await this._model.findByIdAndUpdate(
        courseId,
        {
          status: newStatus,
        },
        { new: true }
      );
      if (!course) return null;

      return {
        id: course._id.toString(),
        title: course.title,
        mentorId: course.mentorId.toString(),
        status: course.status,
      };
    } catch (error) {
      console.error("Error while update status of course:", error);
      throw new Error("Course status update failed");
    }
  }

  async findByIdPopulate(id: string): Promise<ICourseOutPopulateDTO | null> {
    try {
      const course = await this._model
        .findById(id)
        .populate("mentorId", "firstName lastName profilePicture")
        .populate({
          path: "lessons",
          select: "title description",
          populate: {
            path: "materials",
            select: "title description type duration fileKey",
          },
        })
        .populate("categoryId", "title");

      if (!course) return null;

      const { _id: categoryId, title: categoryTitle } =
        course.categoryId as unknown as {
          title: string;
          _id: string;
        };

      // Extract lessons with materials
      const lessons = course.lessons.map((lesson) => {
        const { _id, title, description, materials } = lesson as unknown as {
          _id: string;
          title: string;
          description: string;
          materials: {
            _id: string;
            title: string;
            mentorId: string;
            description: string;
            type: MaterialType;
            duration: number;
            fileKey: string;
            createdAt: number;
            updatedAt: number;
          }[];
        };

        const formattedMaterials = materials.map((material) => ({
          id: material._id.toString(),
          title: material.title,
          mentorId: material.mentorId,
          description: material.description,
          type: material.type,
          duration: material.duration,
          fileKey: material.fileKey,
          createdAt: material.createdAt,
          updatedAt: material.updatedAt,
        }));

        return {
          id: _id.toString(),
          title,
          description,
          materials: formattedMaterials,
        };
      });

      const {
        _id: mentorId,
        firstName,
        lastName,
        profilePicture,
      } = course.mentorId as unknown as {
        _id: string;
        firstName: string;
        lastName: string;
        profilePicture: string;
      };

      return {
        id: course._id.toString(),
        title: course.title,
        mentor: {
          id: mentorId.toString(),
          firstName,
          lastName,
          profilePicture,
        },
        category: {
          id: categoryId.toString(),
          title: categoryTitle,
          isListed: true,
        },
        description: course.description ?? undefined,
        lessons,
        thumbnail: course.thumbnail,
        price: course.price,
        status: course.status,
      };
    } catch (error) {
      console.error("Error while find the course:", error);
      throw new Error("Course fetch failed");
    }
  }

  async findAll({
    category = "all",
    search = "",
    sort = "titleAsc",
    page = "1",
    limit = "5",
  }: QueryCourse): Promise<PaginationDTO> {
    try {
      const query: Record<string, any> = {
        categoryId: category !== "all" ? category : { $exists: true },
        title: { $regex: search, $options: "i" }, // Case-insensitive search
      };

      const sortOptions: { [key: string]: 1 | -1 } = {};
      switch (sort) {
        case "titleAsc":
          sortOptions.title = 1;
          break;
        case "titleDesc":
          sortOptions.title = -1;
          break;
        case "priceAsc":
          sortOptions.price = 1;
          break;
        case "priceDesc":
          sortOptions.price = -1;
          break;
        default:
          sortOptions.title = 1;
          break;
      }

      const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
      const limitParsed = parseInt(limit, 10);

      const courses = await this._model
        .find(query)
        .populate("mentorId", "firstName lastName")
        .populate("categoryId", "title")
        .skip(skip)
        .limit(limitParsed)
        .sort(sortOptions)
        .lean();

      const total = await this._model.countDocuments(query);

      return {
        body: courses.map((course) => {
          const { _id: id, title } = course.categoryId as unknown as {
            title: string;
            _id: string;
          };
          const {
            _id: mentorId,
            firstName,
            lastName,
          } = course.mentorId as unknown as {
            firstName: string;
            lastName: string;
            _id: string;
          };

          return {
            id: course._id.toString(),
            mentor: {
              id: mentorId,
              firstName,
              lastName,
            },
            title: course.title,
            description: course.description,
            category: {
              id,
              title,
            },
            thumbnail: course.thumbnail,
            price: course.price,
            status: course.status,
          };
        }),
        total,
        page: parseInt(page, 10),
        last_page: Math.ceil(total / limitParsed),
      };
    } catch (error) {
      console.error("Error while fetching courses:", error);
      throw new Error("Course fetch failed");
    }
  }

  async findAllByMentorId(
    {
      category = "all",
      search = "",
      sort = "titleAsc",
      page = "1",
      limit = "5",
    }: QueryCourse,
    mentorId: string
  ): Promise<PaginationDTO> {
    try {
      const query: Record<string, any> = {
        mentorId,

        status: category !== "all" ? category : { $exists: true },
        title: { $regex: search, $options: "i" },
      };

      const sortOptions: { [key: string]: 1 | -1 } = {};
      switch (sort) {
        case "titleAsc":
          sortOptions.title = 1;
          break;
        case "titleDesc":
          sortOptions.title = -1;
          break;
        case "priceAsc":
          sortOptions.price = 1;
          break;
        case "priceDesc":
          sortOptions.price = -1;
          break;
        default:
          sortOptions.title = 1;
          break;
      }

      const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
      const limitParsed = parseInt(limit, 10);

      const courses = await this._model
        .find(query)
        .populate("mentorId", "firstName lastName")
        .populate("categoryId", "title")
        .skip(skip)
        .limit(limitParsed)
        .sort(sortOptions)
        .lean();

      const total = await this._model.countDocuments(query);

      return {
        body: courses.map((course) => {
          const { _id: id, title } = course.categoryId as unknown as {
            title: string;
            _id: string;
          };
          const {
            _id: mentorId,
            firstName,
            lastName,
          } = course.mentorId as unknown as {
            firstName: string;
            lastName: string;
            _id: string;
          };

          return {
            id: course._id.toString(),
            mentor: {
              id: mentorId,
              firstName,
              lastName,
            },
            title: course.title,
            description: course.description,
            category: {
              id,
              title,
            },
            thumbnail: course.thumbnail,
            price: course.price,
            status: course.status,
          };
        }),
        total,
        page: parseInt(page, 10),
        last_page: Math.ceil(total / limitParsed),
      };
    } catch (error) {
      console.error("Error while fetching courses:", error);
      throw new Error("Course fetch failed");
    }
  }

  async findAllPublished({
    category = "all",
    search = "",
    sort = "titleAsc",
    page = "1",
    limit = "5",
  }: QueryCourse): Promise<PaginationDTO> {
    try {
      const query: Record<string, any> = {
        status: "published",
        categoryId: category !== "all" ? category : { $exists: true },
        title: { $regex: search, $options: "i" },
      };

      const sortOptions: { [key: string]: 1 | -1 } = {};
      switch (sort) {
        case "titleAsc":
          sortOptions.title = 1;
          break;
        case "titleDesc":
          sortOptions.title = -1;
          break;
        case "priceAsc":
          sortOptions.price = 1;
          break;
        case "priceDesc":
          sortOptions.price = -1;
          break;
        default:
          sortOptions.title = 1;
          break;
      }

      const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
      const limitParsed = parseInt(limit, 10);

      const courses = await this._model
        .find(query)
        .populate("mentorId", "firstName lastName profilePicture")
        .populate("categoryId", "title")
        .skip(skip)
        .limit(limitParsed)
        .sort(sortOptions)
        .lean();

      const total = await this._model.countDocuments(query);

      return {
        body: courses.map((course) => {
          const { _id: id, title } = course.categoryId as unknown as {
            title: string;
            _id: string;
          };
          const {
            _id: mentorId,
            firstName,
            lastName,
            profilePicture,
          } = course.mentorId as unknown as {
            firstName: string;
            lastName: string;
            _id: string;
            profilePicture: string;
          };

          return {
            id: course._id.toString(),
            mentor: {
              id: mentorId,
              firstName,
              lastName,
              profilePicture,
            },
            title: course.title,
            description: course.description,
            category: {
              id,
              title,
            },
            thumbnail: course.thumbnail,
            price: course.price,
            status: course.status,
          };
        }),
        total,
        page: parseInt(page, 10),
        last_page: Math.ceil(total / limitParsed),
      };
    } catch (error) {
      console.error("Error while fetching courses:", error);
      throw new Error("Course fetch failed");
    }
  }

  async userRevenueAnalyze(mentorId: string): Promise<any> {
    try {
      const results = await this._model
        .aggregate(mentorRevenueAnalysisPipeline(mentorId))
        .exec();

      return results[0];
    } catch (error) {
      console.error("Error analyzing mentor data:", error);
      throw new Error(`Failed to analyze mentor data: ${error}`);
    }
  }
}
