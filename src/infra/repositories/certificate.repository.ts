import { Model } from "mongoose";
import { ICertificateRepository } from "../../app/repositories";
import { ICertificate } from "../databases/interfaces";
import { CertificateEntity } from "../../domain/entities";
import { ICertificateOutDTO, UserBaseDetails } from "../../domain/dtos";

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

      // Populate references in the saved document
      const populatedCertificate = await this.model
        .findById(savedCertificate._id)
        .populate("courseId", "title") // Populate course title
        .populate("mentorId", "firstName lastName") // Populate mentor details
        .populate("learnerId", "firstName lastName")
        .exec(); // Execute the query

      // Extract populated data
      if (!populatedCertificate) {
        throw new Error("Certificate not found after creation");
      }

      const { title, _id: courseId } =
        populatedCertificate.courseId as unknown as {
          title: string;
          _id: string;
        };
      const mentor =
        populatedCertificate.mentorId as unknown as UserBaseDetails;
      const learner =
        populatedCertificate.learnerId as unknown as UserBaseDetails;

      // Return the formatted certificate DTO
      return {
        id: savedCertificate._id.toString(),
        progressId: savedCertificate.progressId.toString(),
        course: {
          id: courseId,
          title,
        },
        mentor,
        learner,
        issueDate: savedCertificate.issueDate.getTime(),
      };
    } catch (error) {
      console.error("Error while creating certificate:", error);
      throw new Error("Certificate creation failed");
    }
  }

  async findByProgressId(
    progressId: string
  ): Promise<ICertificateOutDTO | null> {
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
      const mentor = certificate.mentorId as unknown as UserBaseDetails;
      const learner = certificate.learnerId as unknown as UserBaseDetails;

      return {
        id: certificate._id.toString(),
        progressId: certificate.progressId.toString(),
        course: {
          id: courseId,
          title,
        },
        mentor,
        learner,
        issueDate: certificate.issueDate.getTime(),
      };
    } catch (error) {
      console.error("Error while creating certificate:", error);
      throw new Error("Lesson creation failed");
    }
  }
}
