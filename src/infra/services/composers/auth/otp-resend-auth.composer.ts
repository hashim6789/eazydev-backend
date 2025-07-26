import { IOtpRepository } from "../../../../app/repositories/otp.repository";
import { IUsersRepository } from "../../../../app/repositories/user.repository";
import { ResendOtpUseCase } from "../../../../app/usecases/auth/implementations/resend-otp.usecase";
import { IResendOtpUseCase } from "../../../../app/usecases/auth/interfaces/resend-otp-usecase";
import { ResendOtpController } from "../../../../presentation/http/controllers/auth/resend-otp.controller";
import { IController } from "../../../../presentation/http/controllers/IController";
import { OtpModel, UserModel } from "../../../databases/models";
import {
  IGenerateOtpProvider,
  IPasswordHasher,
  ISendMailProvider,
} from "../../../providers";
import { GenerateOtpProvider } from "../../../providers/implementations/generate-otp.provider";
import { PasswordHasher } from "../../../providers/implementations/password-hasher.provider";
import { SendMailProvider } from "../../../providers/implementations/send-mail.provider";
import { OtpRepository } from "../../../repositories/otp.repository";
import { UserRepository } from "../../../repositories/user.repository";

export function resendOtpComposer(): IController {
  const repository: IUsersRepository = new UserRepository(UserModel);
  const otpRepository: IOtpRepository = new OtpRepository(OtpModel);
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
