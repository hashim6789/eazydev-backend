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
import { CourseStatus } from "../../domain/types";
import { PaginationDTO } from "../../domain/dtos/pagination.dtos";

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
        description: course.description ?? undefined,
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
        .populate("mentorId", "firstName lastName, profilePicture")
        .populate("lessons", "title description")
        .populate("categoryId", "title");
      if (!course) return null;

      const { _id: categoryId, title: categoryTitle } =
        course.categoryId as unknown as { title: string; _id: string };
      const lessons = course.lessons.map((item) => {
        const { _id, title, description } = item as unknown as {
          title: string;
          _id: string;
          description: string;
        };
        return {
          id: _id,
          title,
          description,
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
        mentor: { id: mentorId, firstName, lastName, profilePicture },
        category: {
          id: categoryId,
          title: categoryTitle,
        },
        description: course.description ?? undefined,
        lessons: lessons,
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
        description: course.description ?? undefined,
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
}
