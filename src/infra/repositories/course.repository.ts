import { Model } from "mongoose";
import { ICourseRepository } from "../../app/repositories";
import {
  ICreateCourseInDTO,
  ICourseOutDTO,
  IUpdateCourseInDTO,
  QueryCourse,
  ICourseOutPopulateDTO,
  ICourseSimpleOutDTO,
} from "../../domain/dtos";
import { ICourse } from "../databases/interfaces";
import { CourseStatus, MaterialType } from "../../domain/types";
import { PaginationDTO } from "../../domain/dtos/pagination.dtos";
import { mentorRevenueAnalysisPipeline } from "../pipelines/course";
import { Material } from "../../domain/dtos/material";

export class CourseRepository implements ICourseRepository {
  private model: Model<ICourse>;

  constructor(model: Model<ICourse>) {
    this.model = model;
  }
  async create(data: ICreateCourseInDTO): Promise<ICourseOutDTO> {
    try {
      const createData = new this.model({
        title: data.title,
        mentorId: data.mentorId,
        categoryId: data.categoryId,
        description: data.description,
        thumbnail: data.thumbnail,
        price: data.price,
        status: data.status,
      });
      const course = await createData.save();

      return {
        id: course._id.toString(),
        title: course.title,
        mentorId: course.mentorId.toString(),
        categoryId: course.categoryId.toString(),
        description: course.description,
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
  ): Promise<ICourseSimpleOutDTO | null> {
    try {
      const course = await this.model.findByIdAndUpdate(courseId, {
        status: newStatus,
      });
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

  async findById(id: string): Promise<ICourseOutDTO | null> {
    try {
      const course = await this.model.findById(id);

      if (!course) return null;

      return {
        id: course._id.toString(),
        title: course.title,
        mentorId: course.mentorId.toString(),
        categoryId: course.categoryId.toString(),
        description: course.description,
        lessons: course.lessons.map((item) => item.toString()),
        thumbnail: course.thumbnail,
        price: course.price,
        status: course.status,
      };
    } catch (error) {
      console.error("Error while find the course:", error);
      throw new Error("Course fetch failed");
    }
  }
  async findByIdPopulate(id: string): Promise<ICourseOutPopulateDTO | null> {
    try {
      const course = await this.model
        .findById(id)
        .populate("mentorId", "firstName lastName profilePicture")
        .populate({
          path: "lessons",
          select: "title description",
          populate: {
            path: "materials", // Populate materials
            select: "title description type duration fileKey",
          },
        })
        .populate("categoryId", "title");

      if (!course) return null;

      // Extract category details
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

      // Extract mentor details
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

      // Final DTO structure
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
        description: course.description,
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

  async findAll({
    category = "all",
    search = "",
    sort = "titleAsc",
    page = "1",
    limit = "5",
  }: QueryCourse): Promise<PaginationDTO> {
    try {
      // Construct the query
      const query: Record<string, any> = {
        categoryId: category !== "all" ? category : { $exists: true },
        title: { $regex: search, $options: "i" }, // Case-insensitive search
      };

      // Define sorting options
      const sortOptions: Record<string, number> = {};
      switch (sort) {
        case "titleAsc":
          sortOptions.title = 1; // Ascending by title
          break;
        case "titleDesc":
          sortOptions.title = -1; // Descending by title
          break;
        case "priceAsc":
          sortOptions.price = 1; // Ascending by price
          break;
        case "priceDesc":
          sortOptions.price = -1; // Descending by price
          break;
        default:
          sortOptions.title = 1; // Default sorting by title ascending
          break;
      }

      // Pagination logic
      const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
      const limitParsed = parseInt(limit, 10);

      // Fetch courses with query, pagination, and sorting
      const courses = await this.model
        .find(query)
        .populate("mentorId", "firstName lastName")
        .populate("categoryId", "title") // Populate category title
        .skip(skip)
        .limit(limitParsed)
        // .sort(sortOptions)
        .lean(); // Convert mongoose documents to plain objects

      // Count total documents matching query
      const total = await this.model.countDocuments(query);

      console.log("courses", courses);

      // Construct the pagination response
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
      // Construct the query
      const query: Record<string, any> = {
        mentorId,
        categoryId: category !== "all" ? category : { $exists: true },
        title: { $regex: search, $options: "i" }, // Case-insensitive search
      };

      // Define sorting options
      const sortOptions: Record<string, number> = {};
      switch (sort) {
        case "titleAsc":
          sortOptions.title = 1; // Ascending by title
          break;
        case "titleDesc":
          sortOptions.title = -1; // Descending by title
          break;
        case "priceAsc":
          sortOptions.price = 1; // Ascending by price
          break;
        case "priceDesc":
          sortOptions.price = -1; // Descending by price
          break;
        default:
          sortOptions.title = 1; // Default sorting by title ascending
          break;
      }

      // Pagination logic
      const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
      const limitParsed = parseInt(limit, 10);

      // Fetch courses with query, pagination, and sorting
      const courses = await this.model
        .find(query)
        .populate("mentorId", "firstName lastName")
        .populate("categoryId", "title") // Populate category title
        .skip(skip)
        .limit(limitParsed)
        // .sort(sortOptions)
        .lean(); // Convert mongoose documents to plain objects

      // Count total documents matching query
      const total = await this.model.countDocuments(query);

      // Construct the pagination response
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
      // Construct the query
      const query: Record<string, any> = {
        status: "published",
        categoryId: category !== "all" ? category : { $exists: true },
        title: { $regex: search, $options: "i" }, // Case-insensitive search
      };

      // Define sorting options
      const sortOptions: Record<string, number> = {};
      switch (sort) {
        case "titleAsc":
          sortOptions.title = 1; // Ascending by title
          break;
        case "titleDesc":
          sortOptions.title = -1; // Descending by title
          break;
        case "priceAsc":
          sortOptions.price = 1; // Ascending by price
          break;
        case "priceDesc":
          sortOptions.price = -1; // Descending by price
          break;
        default:
          sortOptions.title = 1; // Default sorting by title ascending
          break;
      }

      // Pagination logic
      const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
      const limitParsed = parseInt(limit, 10);

      // Fetch courses with query, pagination, and sorting
      const courses = await this.model
        .find(query)
        .populate("mentorId", "firstName lastName")
        .populate("categoryId", "title") // Populate category title
        .skip(skip)
        .limit(limitParsed)
        // .sort(sortOptions)
        .lean(); // Convert mongoose documents to plain objects

      // Count total documents matching query
      const total = await this.model.countDocuments(query);

      // Construct the pagination response
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

  async userRevenueAnalyze(mentorId: string): Promise<any> {
    try {
      // Execute the aggregation pipeline
      const results = await this.model
        .aggregate(mentorRevenueAnalysisPipeline(mentorId))
        .exec();

      // Return the combined result from facets
      return results[0];
    } catch (error) {
      console.error("Error analyzing mentor data:", error);
      throw new Error(`Failed to analyze mentor data: ${error}`);
    }
  }
}
