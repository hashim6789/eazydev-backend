import { IOtpRepository, IUsersRepository } from "../../../repositories";
import { SignupUseCase } from "../../../../app/usecases/auth/implementations/signup-auth.usecase";
import { ISignupUseCase } from "../../../../app/usecases/auth/interfaces/signup-auth.usecase";
import { SignupController } from "../../../../presentation/http/controllers/auth/signup.controller";
import { IController } from "../../../../presentation/http/controllers/IController";
import { OtpModel, UserModel } from "../../../databases/models";
import {
  IGenerateOtpProvider,
  IGenerateTokenProvider,
  IPasswordHasher,
  ISendMailProvider,
} from "../../../providers";
import { GenerateOtpProvider } from "../../../providers/implementations/generate-otp.provider";
import { GenerateTokenProvider } from "../../../providers/implementations/generate-refresh-token.provider";
import { PasswordHasher } from "../../../providers/implementations/password-hasher.provider";
import { SendMailProvider } from "../../../providers/implementations/send-mail.provider";
import { OtpRepository } from "../../../repositories/implementations/otp.repository";
import { UserRepository } from "../../../repositories/implementations/user.repository";

export function signupComposer(): IController {
  const repository: IUsersRepository = new UserRepository(UserModel);
  const passwordHasher: IPasswordHasher = new PasswordHasher();

  const otpRepository: IOtpRepository = new OtpRepository(OtpModel);
  const generateOtpProvider: IGenerateOtpProvider = new GenerateOtpProvider();
  const sendMailProvider: ISendMailProvider = new SendMailProvider();
  const generateTokenProvider: IGenerateTokenProvider =
    new GenerateTokenProvider();
  const useCase: ISignupUseCase = new SignupUseCase(
    repository,
    passwordHasher,
    generateTokenProvider,
    otpRepository,
    generateOtpProvider,
    sendMailProvider
  );
  const controller: IController = new SignupController(useCase);
  return controller;
}
