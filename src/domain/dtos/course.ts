import { CourseSort, CourseStatus } from "../types";
import { ICategoryOutDTO } from "./category";
import { Material } from "./material";

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
