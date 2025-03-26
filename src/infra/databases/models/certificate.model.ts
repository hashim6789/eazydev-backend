import mongoose from "mongoose";
import { ICertificate } from "../interfaces";
import { certificateSchema } from "../schemas";

export const CertificateModel = mongoose.model<ICertificate>(
  "Certificate",
  certificateSchema
);
