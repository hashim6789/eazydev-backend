import { IOtpRepository, IUsersRepository } from "../../../repositories";
import { VerifyOtpUseCase } from "../../../../app/usecases/auth/implementations/verify-otp.usecase";
import { IVerifyOtpUseCase } from "../../../../app/usecases/auth/interfaces/verify-otp.usecase";
import { VerifyOtpController } from "../../../../presentation/http/controllers/auth/verify-otp.controller";
import { IController } from "../../../../presentation/http/controllers/IController";
import { OtpModel, UserModel } from "../../../databases/models";
import { IPasswordHasher } from "../../../providers";
import { PasswordHasher } from "../../../providers/implementations/password-hasher.provider";
import { OtpRepository } from "../../../repositories/implementations/otp.repository";
import { UserRepository } from "../../../repositories/implementations/user.repository";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function otpVerifyComposer(): IController {
  const repository: IUsersRepository = new UserRepository(UserModel);
  const otpRepository: IOtpRepository = new OtpRepository(OtpModel);
  const passwordHasher: IPasswordHasher = new PasswordHasher();

  const useCase: IVerifyOtpUseCase = new VerifyOtpUseCase(
    repository,
    otpRepository,
    passwordHasher
  );
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new VerifyOtpController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
