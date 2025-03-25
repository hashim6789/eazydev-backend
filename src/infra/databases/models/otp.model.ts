import mongoose from "mongoose";
import { IOtp } from "../interfaces";
import { otpSchema } from "../schemas";

export const OtpModel = mongoose.model<IOtp>("Otp", otpSchema);
