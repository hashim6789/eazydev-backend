import { MaterialType } from "../types";

export interface ILessonOutDTO {
  id: string;
  title: string;
  description: string;
  mentorId: string;
  materials: string[];
}
export interface ILessonOutPopulateDTO {
  id: string;
  title: string;
  description: string;
  mentorId: string;
  materials: {
    id: string;
    title: string;
    description: string;
    duration: number;
    type: MaterialType;
  }[];
}

export type ICreateLessonInDTO = Omit<ILessonOutDTO, "id">;

export type ICreateLessonRequestDTO = Omit<ILessonOutDTO, "id"> & {
  courseId: string;
};
export type IUpdateLessonRequestDTO = ILessonOutDTO & {
  courseId: string;
};
