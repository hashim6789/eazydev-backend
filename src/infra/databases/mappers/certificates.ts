import { Types } from "mongoose";
import { CertificateEntity } from "../../../domain/entities";
import { ICertificate } from "../interfaces";
export const mapCertificateToDocument = (
  entity: CertificateEntity
): Partial<ICertificate> => {
  return {
    progressId: new Types.ObjectId(entity.progressId),
    courseId: new Types.ObjectId(entity.courseId),
    mentorId: new Types.ObjectId(entity.mentorId),
    learnerId: new Types.ObjectId(entity.learnerId),
    issueDate: new Date(entity.issueDate),
  };
};
