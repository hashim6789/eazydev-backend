import mongoose from "mongoose";
import { IOtp } from "../interfaces";
import { otpSchema } from "../schemas";

const OtpModel = mongoose.model<IOtp>("Otp", otpSchema);

export default OtpModel;
