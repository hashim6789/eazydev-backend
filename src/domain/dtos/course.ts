import { CourseSort, CourseStatus } from "../types";

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
  description?: string;
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
    firstName: string;
    lastName: string;
    profilePicture: string;
  };
  category: {
    id: string;
    title: string;
  };
  description?: string;
  lessons: { id: string; title: string; description: string }[];
  thumbnail: string;
  price: number;
  status: CourseStatus;
}

export interface ICreateCourseRequestDTO {
  title: string;
  mentorId: string;
  categoryId: string;
  description?: string;
  thumbnail: string;
  price: number;
}

export interface IUpdateStatusCourseRequestDTO {
  courseId: string;
  newStatus: CourseStatus;
}
export interface IUpdateCourseRequestDTO {
  courseId: string;
  mentorId: string;
  title?: string;
  categoryId?: string;
  description?: string;
  thumbnail?: string;
  price?: number;
  lessons?: string[];
}

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
