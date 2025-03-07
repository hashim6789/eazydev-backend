import { IGenerateRefreshTokenProvider } from "../../../../app/providers/generate-refresh-token.provider";
import { IPasswordHasher } from "../../../../app/providers/password-hasher.provider";
import { IOtpRepository } from "../../../../app/repositories/otp.repository";
import { IRefreshTokenRepository } from "../../../../app/repositories/refresh-token.repository";
import { IUsersRepository } from "../../../../app/repositories/user.repository";
import { LoginUseCase } from "../../../../app/usecases/auth/implementations/login-auth-usecase";
import { VerifyOtpUseCase } from "../../../../app/usecases/auth/implementations/verify-otp.usecase";
import { ILoginUseCase } from "../../../../app/usecases/auth/login-auth.usecase";
import { IVerifyOtpUseCase } from "../../../../app/usecases/auth/verify-otp.usecase";
import { LoginController } from "../../../../presentation/http/controllers/auth/implementations/login.controller";
import { VerifyOtpController } from "../../../../presentation/http/controllers/auth/implementations/verify-otp.controller";
import { IController } from "../../../../presentation/http/controllers/IController";
import { GenerateRefreshTokenProvider } from "../../../providers/generate-refresh-token.provider";
import { PasswordHasher } from "../../../providers/password-hasher.provider";
import { OtpRepository } from "../../../repositories/otp.repository";
import { RefreshTokenRepository } from "../../../repositories/refresh-token-repository";
import { UserRepository } from "../../../repositories/user.repository";

export function otpVerifyComposer(): IController {
  const repository: IUsersRepository = new UserRepository();
  const otpRepository: IOtpRepository = new OtpRepository();
  const passwordHasher: IPasswordHasher = new PasswordHasher();

  const useCase: IVerifyOtpUseCase = new VerifyOtpUseCase(
    repository,
    otpRepository,
    passwordHasher
  );
  const controller: IController = new VerifyOtpController(useCase);
  return controller;
}
