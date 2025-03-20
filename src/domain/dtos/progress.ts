import { MaterialType } from "../types";

export interface IProgressOutDTO {
  id: string;
  userId: string;
  courseId: string;
  completedLessons: string[];
  completedMaterials: string[];
  isCourseCompleted: boolean;
  progress: number;
  completedDate: number | null;
}
export interface IProgressOutPopulateDTO {
  userId: string;
  course: {
    id: string;
    title: string;
  };
  completedLessons: string[];
  completedMaterials: string[];
  isCourseCompleted: boolean;
  progress: number;
  completedDate: number | null;
}
