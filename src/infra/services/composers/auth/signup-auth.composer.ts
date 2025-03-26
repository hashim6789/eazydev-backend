import { IGenerateOtpProvider } from "../../../../app/providers/generate-otp.provider";
import { IGenerateTokenProvider } from "../../../../app/providers/generate-refresh-token.provider";
import { IPasswordHasher } from "../../../../app/providers/password-hasher.provider";
import { ISendMailProvider } from "../../../../app/providers/send-mail.provider";
import { IOtpRepository } from "../../../../app/repositories/otp.repository";
import { ITokenRepository } from "../../../../app/repositories/token.repository";
import { IUsersRepository } from "../../../../app/repositories/user.repository";
import { SignupUseCase } from "../../../../app/usecases/auth/implementations/signup-auth.usecase";
import { ISignupUseCase } from "../../../../app/usecases/auth/interfaces/signup-auth.usecase";
import { SignupController } from "../../../../presentation/http/controllers/auth/signup.controller";
import { IController } from "../../../../presentation/http/controllers/IController";
import { OtpModel, TokenModel, UserModel } from "../../../databases/models";
import { GenerateOtpProvider } from "../../../providers/generate-otp.provider";
import { GenerateTokenProvider } from "../../../providers/generate-refresh-token.provider";
import { PasswordHasher } from "../../../providers/password-hasher.provider";
import { SendMailProvider } from "../../../providers/send-mai.provider";
import { TokenRepository } from "../../../repositories";
import { OtpRepository } from "../../../repositories/otp.repository";
import { UserRepository } from "../../../repositories/user.repository";

export function signupComposer(): IController {
  const repository: IUsersRepository = new UserRepository(UserModel);
  const passwordHasher: IPasswordHasher = new PasswordHasher();
  const refreshTokenRepository: ITokenRepository = new TokenRepository(
    TokenModel
  );

  const otpRepository: IOtpRepository = new OtpRepository(OtpModel);
  const generateOtpProvider: IGenerateOtpProvider = new GenerateOtpProvider();
  const sendMailProvider: ISendMailProvider = new SendMailProvider();
  const generateTokenProvider: IGenerateTokenProvider =
    new GenerateTokenProvider();
  const useCase: ISignupUseCase = new SignupUseCase(
    repository,
    passwordHasher,
    refreshTokenRepository,
    generateTokenProvider,
    otpRepository,
    generateOtpProvider,
    sendMailProvider
  );
  const controller: IController = new SignupController(useCase);
  return controller;
}
