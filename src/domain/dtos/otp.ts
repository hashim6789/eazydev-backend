export interface IOtpOutDTO {
  id: string;
  userId: string;
  expiresIn: number;
  otp: string;
}
export type IOtpInDTO = Omit<IOtpOutDTO, "id">;
