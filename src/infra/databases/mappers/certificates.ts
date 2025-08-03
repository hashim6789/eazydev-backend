import { Types } from "mongoose";
import { CertificateEntity } from "../../../domain/entities";
import { ICertificate } from "../interfaces";
import { ICertificateOutPopulateDTO } from "../../../domain/dtos";
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

export const mapDocumentToCertificate = (
  certificate: ICertificate
): ICertificateOutPopulateDTO => {
  const { title, _id: courseId } = certificate.courseId as unknown as {
    title: string;
    _id: string;
  };

  const {
    _id: mentorId,
    firstName: mentorFirst,
    lastName: mentorLast,
  } = certificate.mentorId as unknown as {
    _id: string;
    firstName: string;
    lastName: string;
  };

  const {
    _id: learnerId,
    firstName: learnerFirst,
    lastName: learnerLast,
  } = certificate.learnerId as unknown as {
    _id: string;
    firstName: string;
    lastName: string;
  };

  return {
    id: certificate._id.toString(),
    progressId: certificate.progressId.toString(),
    course: {
      id: courseId,
      title,
    },
    mentor: {
      id: mentorId,
      firstName: mentorFirst,
      lastName: mentorLast,
    },
    learner: {
      id: learnerId,
      firstName: learnerFirst,
      lastName: learnerLast,
    },
    issueDate: certificate.issueDate.getTime(),
  };
};
