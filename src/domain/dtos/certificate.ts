export interface UserBaseDetails {
  id: string;
  firstName: string;
  lastName: string;
}

export interface ICertificateOutDTO {
  id: string;
  progressId: string;
  courseId: string;
  mentorId: string;
  learnerId: string;
  issueDate: number;
}
export interface ICertificateOutPopulateDTO {
  id: string;
  progressId: string;
  course: {
    id: string;
    title: string;
  };
  mentor: UserBaseDetails;
  learner: UserBaseDetails;
  issueDate: number;
}

export interface IGetCertificateRequestDTO {
  progressId: string;
}

import { z } from "zod";
import { ObjectIdSchema } from "./common";
import { RoleTypes } from "../enums";

export const GetCertificateBodySchema = z.object({
  userId: ObjectIdSchema,
  role: z.nativeEnum(RoleTypes), // tailor to your role types
});

export const GetCertificatePathSchema = z.object({
  progressId: ObjectIdSchema,
});
export const GetPreviewCertificatePathSchema = z.object({
  certificateId: ObjectIdSchema,
});

export type GetCertificateBodyDTO = z.infer<typeof GetCertificateBodySchema>;
export type GetCertificatePathDTO = z.infer<typeof GetCertificatePathSchema>;
