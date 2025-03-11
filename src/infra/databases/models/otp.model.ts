import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IOtp extends Document {
  _id: ObjectId;
  otp: string;
  userId: ObjectId;
  expiresIn: number;
}

const OtpSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId },
    otp: { type: String, required: true },
    expiresIn: { type: Date, default: Date.now() },
  },
  {
    timestamps: true,
  }
);

const OtpModel = mongoose.model<IOtp>("Otp", OtpSchema);

export default OtpModel;
