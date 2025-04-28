import { Model } from "mongoose";
import { ICertificateRepository } from "../../app/repositories";
import { ICertificate } from "../databases/interfaces";
import { CertificateEntity } from "../../domain/entities";
import {
  ICertificateOutDTO,
  ICertificateOutPopulateDTO,
  QueryCertificate,
} from "../../domain/dtos";
import { PaginationDTO } from "../../domain/dtos/pagination.dtos";

export class CertificateRepository implements ICertificateRepository {
  private model: Model<ICertificate>;

  constructor(model: Model<ICertificate>) {
    this.model = model;
  }

  async create(data: CertificateEntity): Promise<ICertificateOutDTO> {
    try {
      // Save the certificate to the database
      const createData = new this.model({
        progressId: data.progressId,
        courseId: data.courseId,
        mentorId: data.mentorId,
        learnerId: data.learnerId,
        issueDate: data.issueDate,
      });
      const savedCertificate = await createData.save(); // Wait for the save operation
      return {
        id: savedCertificate._id.toString(),
        progressId: savedCertificate.progressId.toString(),
        courseId: savedCertificate.courseId.toString(),
        mentorId: savedCertificate.mentorId.toString(),
        learnerId: savedCertificate.learnerId.toString(),
        issueDate: savedCertificate.issueDate.getTime(),
      };
    } catch (error) {
      console.error("Error while creating certificate:", error);
      throw new Error("Certificate creation failed");
    }
  }

  async findByProgressId(
    progressId: string
  ): Promise<ICertificateOutPopulateDTO | null> {
    try {
      const certificate = await this.model
        .findOne({ progressId })
        .populate("courseId", "title")
        .populate("mentorId", "firstName lastName")
        .populate("learnerId", "firstName lastName");

      if (!certificate) return null;

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

      // Return the formatted certificate DTO
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
    } catch (error) {
      console.error("Error while creating certificate:", error);
      throw new Error("Lesson creation failed");
    }
  }

  async findAllByUser(
    userId: string,
    { page = "1", limit = "5" }: QueryCertificate
  ): Promise<PaginationDTO | null> {
    try {
      // Pagination logic
      const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
      const limitParsed = parseInt(limit, 10);
      const certificates = await this.model
        .find({ learnerId: userId })
        .populate("courseId", "title")
        .populate("mentorId", "firstName lastName")
        .populate("learnerId", "firstName lastName")
        .skip(skip)
        .limit(limitParsed);

      const total = await this.model.countDocuments({ learnerId: userId });

      if (!certificates) return null;

      const data = certificates.map(formatCertificateData);
      return {
        body: data,
        total,
        page: parseInt(page, 10),
        last_page: Math.ceil(total / limitParsed),
      };
    } catch (error) {
      console.error("Error while creating certificate:", error);
      throw new Error("Lesson creation failed");
    }
  }
}

export function formatCertificateData(
  certificate: ICertificate
): ICertificateOutPopulateDTO {
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
    issueDate:
      certificate.issueDate instanceof Date
        ? certificate.issueDate.getTime()
        : new Date(certificate.issueDate).getTime(), // in case issueDate is a string
  };
}
