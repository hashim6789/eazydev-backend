import { IGenerateOtpProvider } from "../interfaces";

export class GenerateOtpProvider implements IGenerateOtpProvider {
  async generateOtp(): Promise<string> {
    // Define the length of the OTP
    const otpLength = 6;

    // Generate a random OTP
    const otp = Array.from({ length: otpLength }, () =>
      Math.floor(Math.random() * 10)
    ).join("");

    // You might want to add additional logic here, like saving the OTP to a database or sending it via SMS/email

    return otp;
  }
}
