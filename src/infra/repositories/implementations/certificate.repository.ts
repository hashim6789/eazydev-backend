import { Model, Types } from "mongoose";
import { ICertificate } from "../../databases/interfaces";
import { CertificateEntity } from "../../../domain/entities";
import {
  ICertificateOutDTO,
  ICertificateOutPopulateDTO,
  PaginationDTO,
  SimplePagination,
} from "../../../domain/dtos";
import { ICertificateRepository } from "../interfaces";
import { BaseRepository } from "./base-repository";
import { mapDocumentToCertificate } from "../../databases/mappers";

export class CertificateRepository
  extends BaseRepository<ICertificate>
  implements ICertificateRepository
{
  // private model: Model<ICertificate>;

  constructor(model: Model<ICertificate>) {
    super(model);
    // this.model = model;
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

      return mapDocumentToCertificate(certificate);
    } catch (error) {
      console.error("Error while creating certificate:", error);
      throw new Error("Lesson creation failed");
    }
  }

  async findAllByUser(
    userId: string,
    { page = "1", limit = "5" }: SimplePagination
  ): Promise<PaginationDTO | null> {
    try {
      const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
      const limitParsed = parseInt(limit, 10);

      const certificates = await this.model
        .find({ learnerId: userId })
        .populate("courseId", "title")
        .populate("mentorId", "firstName lastName")
        .populate("learnerId", "firstName lastName")
        .skip(skip)
        .limit(limitParsed)
        .lean();

      if (!certificates) return null;

      const total = await this.model.countDocuments({ learnerId: userId });

      // Return the formatted certificate DTO
      return {
        body: certificates.map(mapDocumentToCertificate),
        total,
        page: parseInt(page, 10),
        last_page: Math.ceil(total / limitParsed),
      };
    } catch (error) {
      console.error("Error while creating certificate:", error);
      throw new Error("Lesson creation failed");
    }
  }

  async findById(id: string | Types.ObjectId): Promise<ICertificate | null> {
    try {
      const certificate = await this.model
        .findById(id)
        .populate("courseId", "title")
        .populate("mentorId", "firstName lastName")
        .populate("learnerId", "firstName lastName");

      if (!certificate) return null;

      return certificate;
    } catch (error) {
      console.error("Error while creating certificate:", error);
      throw new Error("Lesson creation failed");
    }
  }
}
