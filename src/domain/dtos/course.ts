import { CourseStatus } from "../types";

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

export interface ICreateCourseRequestDTO {
  title: string;
  mentorId: string;
  categoryId: string;
  description?: string;
  thumbnail: string;
  price: number;
}
