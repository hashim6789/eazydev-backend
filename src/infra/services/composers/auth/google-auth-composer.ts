import { ITokenRepository } from "../../../repositories";
import { IGoogleLoginUseCase } from "../../../../app/usecases/auth/interfaces/google-login.usecase";
import { GoogleLoginUseCase } from "../../../../app/usecases/auth/implementations/google.auth.usecase";
import { GoogleLoginController } from "../../../../presentation/http/controllers/auth/google-login.controller";
import { IController } from "../../../../presentation/http/controllers/IController";
import { TokenModel, UserModel } from "../../../databases/models";
import { GenerateTokenProvider } from "../../../providers/implementations/generate-refresh-token.provider";
import { TokenRepository } from "../../../repositories/implementations/token-repository";
import { UserRepository } from "../../../repositories/implementations/user.repository";
import { IGenerateTokenProvider } from "../../../providers";
import { IUsersRepository } from "../../../repositories";

export function googleLoginComposer(): IController {
  const repository: IUsersRepository = new UserRepository(UserModel);
  const generateTokenProvider: IGenerateTokenProvider =
    new GenerateTokenProvider();
  const refreshTokenRepository: ITokenRepository = new TokenRepository(
    TokenModel
  );
  const useCase: IGoogleLoginUseCase = new GoogleLoginUseCase(
    repository,
    refreshTokenRepository,
    generateTokenProvider
  );
  const controller: IController = new GoogleLoginController(useCase);
  return controller;
}
