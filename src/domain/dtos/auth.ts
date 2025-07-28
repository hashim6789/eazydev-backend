import { AuthenticateUserErrorType, RoleTypes } from "../enums";
import { z } from "zod";
import { ObjectIdSchema } from "./common";

const { INVALID_EMAIL, INVALID_CREDENTIAL_LENGTH, INVALID_PASSWORD_LENGTH } =
  AuthenticateUserErrorType;
const { ADMIN, MENTOR, LEARNER } = RoleTypes;

export const SignupRequestSchema = z.object({
  firstName: z.string().min(5, INVALID_CREDENTIAL_LENGTH),
  lastName: z.string().min(5, INVALID_CREDENTIAL_LENGTH),
  email: z.string().email(INVALID_EMAIL),
  role: z.enum([LEARNER, MENTOR]), // adjust roles if needed
  password: z.string().min(6, INVALID_PASSWORD_LENGTH),
});
export type ISignupRequestDTO = z.infer<typeof SignupRequestSchema>;

export const LoginRequestSchema = z.object({
  email: z.string().email(INVALID_EMAIL),
  password: z.string().min(8, INVALID_PASSWORD_LENGTH),
  role: z.enum([ADMIN, MENTOR, LEARNER]),
});

export type ILoginRequestDTO = z.infer<typeof LoginRequestSchema>;

export const GoogleLoginRequestSchema = z.object({
  googleToken: z.string().min(10, INVALID_CREDENTIAL_LENGTH),
  role: z.enum([MENTOR, LEARNER]),
});
export type IGoogleLoginRequestDTO = z.infer<typeof GoogleLoginRequestSchema>;

export const ForgotPasswordRequestSchema = z.object({
  email: z.string().email(INVALID_EMAIL),
  role: z.enum([MENTOR, LEARNER]),
});
export type IForgotPasswordRequestDTO = z.infer<
  typeof ForgotPasswordRequestSchema
>;

export const GetResetPageRequestSchema = z.object({
  tokenId: z.string().min(1, INVALID_CREDENTIAL_LENGTH),
  role: z.enum([MENTOR, LEARNER]),
});

export type IGetResetPageRequestDTO = z.infer<typeof GetResetPageRequestSchema>;

// Usage
export const ResendOtpRequestSchema = z.object({
  userId: ObjectIdSchema,
});

export type IResendOtpRequestDTO = z.infer<typeof ResendOtpRequestSchema>;

export const ResetPasswordRequestSchema = z.object({
  tokenId: z.string().min(1, INVALID_CREDENTIAL_LENGTH),
  role: z.enum([MENTOR, LEARNER]),
  password: z.string().min(8, INVALID_PASSWORD_LENGTH), // customize this if needed
});

export type IResetPasswordRequestDTO = z.infer<
  typeof ResetPasswordRequestSchema
>;

export const VerifyOtpRequestSchema = z.object({
  otp: z.string().min(1, "OTP is required"),
  userId: ObjectIdSchema,
});

export type IVerifyOtpRequestDTO = z.infer<typeof VerifyOtpRequestSchema>;
