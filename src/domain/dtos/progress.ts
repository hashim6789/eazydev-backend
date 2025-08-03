import { z } from "zod";
import { MaterialType } from "../types";
import { ObjectIdSchema } from "./common";
import { RoleTypes } from "../enums";

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
  id: string;
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

export type IGetLearningContentRequestDTO = { progressId: string };
export type IUpdateProgressRequestDTO = {
  progressId: string;
  materialId: string;
};
export type IGetSignedUrlRequestDTO = {
  progressId: string;
  fileKey: string;
  materialType: MaterialType;
};

export interface ProgressMaterial {
  id: string;
  title: string;
  description: string;
  type: "reading" | "video";
  duration: number;
  fileKey: string;
  isCompleted: boolean;
}

export interface ProgressLesson {
  id: string;
  title: string;
  materials: ProgressMaterial[];
  isCompleted: boolean;
}

export interface PopulatedProgressLearningsDTO {
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
  lessons: ProgressLesson[];
}

//

export const GetProgressBodySchema = z.object({
  userId: ObjectIdSchema,
  role: z.nativeEnum(RoleTypes),
});

//
// Body validation
export const LearningContentBodySchema = z.object({
  userId: ObjectIdSchema,
  role: z.nativeEnum(RoleTypes),
});

// Path validation
export const LearningContentPathSchema = z.object({
  progressId: ObjectIdSchema,
});

//
// Path params: progressId
export const SignedUrlPathSchema = z.object({
  progressId: ObjectIdSchema,
});

// Body params
export const SignedUrlBodySchema = z.object({
  userId: ObjectIdSchema,
  role: z.nativeEnum(RoleTypes),
  materialType: z.enum(["video", "reading"]),
  fileKey: z.string().min(1),
});

//
// Path: progressId
export const UpdateProgressPathSchema = z.object({
  progressId: ObjectIdSchema,
});

// Body: userId, role, materialId
export const UpdateProgressBodySchema = z.object({
  userId: ObjectIdSchema,
  role: z.nativeEnum(RoleTypes),
  materialId: ObjectIdSchema,
});

//
