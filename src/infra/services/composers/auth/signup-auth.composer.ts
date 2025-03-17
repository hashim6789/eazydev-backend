import { IGenerateOtpProvider } from "../../../../app/providers/generate-otp.provider";
import { IGenerateRefreshTokenProvider } from "../../../../app/providers/generate-refresh-token.provider";
import { IPasswordHasher } from "../../../../app/providers/password-hasher.provider";
import { ISendMailProvider } from "../../../../app/providers/send-mail.provider";
import { IOtpRepository } from "../../../../app/repositories/otp.repository";
import { IRefreshTokenRepository } from "../../../../app/repositories/refresh-token.repository";
import { IUsersRepository } from "../../../../app/repositories/user.repository";
import { SignupUseCase } from "../../../../app/usecases/auth/implementations/signup-auth.usecase";
import { ISignupUseCase } from "../../../../app/usecases/auth/signup-auth.usecase";
import { SignupController } from "../../../../presentation/http/controllers/auth/signup.controller";
import { IController } from "../../../../presentation/http/controllers/IController";
import { GenerateOtpProvider } from "../../../providers/generate-otp.provider";
import { GenerateRefreshTokenProvider } from "../../../providers/generate-refresh-token.provider";
import { PasswordHasher } from "../../../providers/password-hasher.provider";
import { SendMailProvider } from "../../../providers/send-mai.provider";
import { OtpRepository } from "../../../repositories/otp.repository";
import { RefreshTokenRepository } from "../../../repositories/refresh-token-repository";
import { UserRepository } from "../../../repositories/user.repository";

export function signupComposer(): IController {
  const repository: IUsersRepository = new UserRepository();
  const passwordHasher: IPasswordHasher = new PasswordHasher();
  const refreshTokenRepository: IRefreshTokenRepository =
    new RefreshTokenRepository();

  const otpRepository: IOtpRepository = new OtpRepository();
  const generateOtpProvider: IGenerateOtpProvider = new GenerateOtpProvider();
  const sendMailProvider: ISendMailProvider = new SendMailProvider();
  const generateRefreshTokenProvider: IGenerateRefreshTokenProvider =
    new GenerateRefreshTokenProvider();
  const useCase: ISignupUseCase = new SignupUseCase(
    repository,
    passwordHasher,
    refreshTokenRepository,
    generateRefreshTokenProvider,
    otpRepository,
    generateOtpProvider,
    sendMailProvider
  );
  const controller: IController = new SignupController(useCase);
  return controller;
}
