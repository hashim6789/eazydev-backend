import { IGenerateOtpProvider } from "../../../../app/providers/generate-otp.provider";
import { IPasswordHasher } from "../../../../app/providers/password-hasher.provider";
import { ISendMailProvider } from "../../../../app/providers/send-mail.provider";
import { IOtpRepository } from "../../../../app/repositories/otp.repository";
import { IUsersRepository } from "../../../../app/repositories/user.repository";
import { ResendOtpUseCase } from "../../../../app/usecases/auth/implementations/resend-otp.usecase";
import { IResendOtpUseCase } from "../../../../app/usecases/auth/interfaces/resend-otp-usecase";
import { ResendOtpController } from "../../../../presentation/http/controllers/auth/resend-otp.controller";
import { VerifyOtpController } from "../../../../presentation/http/controllers/auth/verify-otp.controller";
import { IController } from "../../../../presentation/http/controllers/IController";
import { GenerateOtpProvider } from "../../../providers/generate-otp.provider";
import { PasswordHasher } from "../../../providers/password-hasher.provider";
import { SendMailProvider } from "../../../providers/send-mai.provider";
import { OtpRepository } from "../../../repositories/otp.repository";
import { UserRepository } from "../../../repositories/user.repository";

export function resendOtpComposer(): IController {
  const repository: IUsersRepository = new UserRepository();
  const otpRepository: IOtpRepository = new OtpRepository();
  const passwordHasher: IPasswordHasher = new PasswordHasher();
  const generateOtpProvider: IGenerateOtpProvider = new GenerateOtpProvider();
  const sendMailProvider: ISendMailProvider = new SendMailProvider();

  const useCase: IResendOtpUseCase = new ResendOtpUseCase(
    repository,
    otpRepository,
    passwordHasher,
    generateOtpProvider,
    sendMailProvider
  );
  const controller: IController = new ResendOtpController(useCase);
  return controller;
}
