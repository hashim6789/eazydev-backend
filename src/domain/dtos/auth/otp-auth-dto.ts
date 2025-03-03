/**
 * Data Transfer Object (DTO) representing a otp.
 *
 * @interface
 */
export interface OtpDTO {
  id: string;
  expiresIn: number;
  userId: string;
  otp: string;
}
