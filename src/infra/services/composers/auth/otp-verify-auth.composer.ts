import { IPasswordHasher } from "../../../../app/providers/password-hasher.provider";
import { IOtpRepository } from "../../../../app/repositories/otp.repository";
import { IUsersRepository } from "../../../../app/repositories/user.repository";
import { VerifyOtpUseCase } from "../../../../app/usecases/auth/implementations/verify-otp.usecase";
import { IVerifyOtpUseCase } from "../../../../app/usecases/auth/verify-otp.usecase";
import { VerifyOtpController } from "../../../../presentation/http/controllers/auth/verify-otp.controller";
import { IController } from "../../../../presentation/http/controllers/IController";
import OtpModel from "../../../databases/models/otp.model";
import { PasswordHasher } from "../../../providers/password-hasher.provider";
import { OtpRepository } from "../../../repositories/otp.repository";
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
