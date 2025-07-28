import { z } from "zod";
import { CourseSort, CourseStatus } from "../types";
import { ICategoryOutDTO } from "./category";
import { Material } from "./material";
import { ObjectIdSchema } from "./common";
import { CourseSorts, CourseStatuses } from "../enums";

export interface ICreateCourseInDTO {
  title: string;
  mentorId: string;
  categoryId: string;
  description?: string;
  thumbnail: string;
  price: number;
  status: CourseStatus;
}

export interface ICourseOutDTO {
  id: string;
  title: string;
  mentorId: string;
  categoryId: string;
  description: string;
  lessons: string[];
  thumbnail: string;
  price: number;
  status: CourseStatus;
}
export interface ICourseSimpleOutDTO {
  id: string;
  title: string;
  mentorId: string;
  status: CourseStatus;
}

export interface ICourseOutPopulateDTO {
  id: string;
  title: string;
  mentor: {
    id: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
  };
  category: ICategoryOutDTO;
  description: string;
  lessons: {
    id: string;
    title: string;
    description: string;
    materials: Material[];
  }[];
  thumbnail: string;
  price: number;
  status: CourseStatus;
}
export interface ICourseOutPopulateDTO {
  id: string;
  title: string;
  mentor: {
    id: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
  };
  category: ICategoryOutDTO;
  description: string;
  lessons: {
    id: string;
    title: string;
    description: string;
    materials: Material[];
  }[];
  thumbnail: string;
  price: number;
  status: CourseStatus;
}
export interface ICourseOutSimplePopulateDTO {
  id: string;
  title: string;
  mentor: {
    id: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
  };
  category: ICategoryOutDTO;
  description: string;
  thumbnail: string;
  price: number;
  status: CourseStatus;
}

export interface ICreateCourseRequestDTO {
  title: string;
  mentorId: string;
  categoryId: string;
  description: string;
  thumbnail: string;
  price: number;
}

export interface IUpdateStatusCourseRequestDTO {
  courseId: string;
  newStatus: CourseStatus;
}
export type IUpdateCourseRequestDTO = ICreateCourseRequestDTO & {
  courseId: string;
};
// export interface IUpdateCourseRequestDTO {
//   courseId: string;
//   mentorId: string;
//   title?: string;
//   categoryId?: string;
//   description?: string;
//   thumbnail?: string;
//   price?: number;
//   lessons?: string[];
// }

export type IUpdateCourseInDTO = Omit<
  IUpdateCourseRequestDTO,
  "courseId" | "mentorId"
>;

export interface QueryCourse {
  category: string;
  // range:string;
  search: string;
  page: string;
  limit: string;
  sort: CourseSort;
}

export const CreateCourseSchema = z.object({
  userId: ObjectIdSchema,
  role: z.enum(["mentor"]), // tweak to match your role model
  title: z.string().min(1, "Course title is required"),
  description: z.string().min(1, "Description cannot be empty"),
  mentorId: ObjectIdSchema,
  categoryId: ObjectIdSchema,
  thumbnail: z.string().url("Thumbnail must be a valid URL"),
  price: z.number().nonnegative("Price must be zero or higher"),
});

export type CreateCourseDTO = z.infer<typeof CreateCourseSchema>;

//

export const GetCoursesQuerySchema = z.object({
  category: z.string().min(1),
  search: z.string(),
  sort: z.nativeEnum(CourseSorts), // tweak based on your use case
  page: z.string().regex(/^\d+$/, "Page must be a number"), // or use z.coerce.number()
  limit: z.string().regex(/^\d+$/, "Limit must be a number"), // if coming as string from query
});

export const GetCoursesUserSchema = z.object({
  userId: ObjectIdSchema,
  role: z.enum(["admin", "mentor", "learner"]),
});

export type GetCoursesQueryDTO = z.infer<typeof GetCoursesQuerySchema>;
export type GetCoursesUserDTO = z.infer<typeof GetCoursesUserSchema>;

//

export const GetCoursePathSchema = z.object({
  courseId: ObjectIdSchema,
});

export type GetCoursePathDTO = z.infer<typeof GetCoursePathSchema>;

//
export const UpdateCoursePathSchema = z.object({
  courseId: ObjectIdSchema,
});

export const UpdateCourseBodySchema = z.object({
  userId: ObjectIdSchema,
  role: z.enum(["admin", "mentor"]),
  mentorId: ObjectIdSchema,
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  categoryId: ObjectIdSchema,
  thumbnail: z.string().url("Thumbnail must be a valid URL"),
  price: z.number().nonnegative("Price must be zero or higher"),
});

export type UpdateCoursePathDTO = z.infer<typeof UpdateCoursePathSchema>;
export type UpdateCourseBodyDTO = z.infer<typeof UpdateCourseBodySchema>;

//
export const UpdateCourseStatusPathSchema = z.object({
  courseId: ObjectIdSchema,
});

export const UpdateCourseStatusBodySchema = z.object({
  userId: ObjectIdSchema,
  role: z.enum(["admin", "mentor"]),
  newStatus: z.nativeEnum(CourseStatuses), // customize to your valid statuses
});

export type UpdateCourseStatusPathDTO = z.infer<
  typeof UpdateCourseStatusPathSchema
>;
export type UpdateCourseStatusBodyDTO = z.infer<
  typeof UpdateCourseStatusBodySchema
>;
