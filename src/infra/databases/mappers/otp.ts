import { Types } from "mongoose";
import { IOtp } from "../interfaces";
import { IOtpInDTO, IOtpOutDTO } from "../../../domain/dtos";

export const mapOtpToDocument = (entity: IOtpInDTO): Partial<IOtp> => {
  return {
    otp: entity.otp,
    userId: new Types.ObjectId(entity.userId),
    expiresIn: new Date(entity.expiresIn),
  };
};

export function mapOtpToDTO(material: IOtp): IOtpOutDTO {
  return {
    id: material._id.toString(),
    otp: material.otp,
    userId: material.userId.toString(),
    expiresIn: material.expiresIn.getTime(),
  };
}
