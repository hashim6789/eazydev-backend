import { MaterialType } from "../types";

export interface IProgressOutDTO {
  id: string;
  userId: string;
  courseId: string;
  mentorId: string;
  completedLessons: string[];
  completedMaterials: string[];
  isCourseCompleted: boolean;
  progress: number;
  completedDate: number | null;
}
export interface IProgressOutPopulateDTO {
  userId: string;
  mentor: {
    id: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
  };

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

export interface QueryProgress {
  page: string;
  limit: string;
}
