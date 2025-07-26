export interface IGenerateOtpProvider {
  generateOtp(): Promise<string>;
}
