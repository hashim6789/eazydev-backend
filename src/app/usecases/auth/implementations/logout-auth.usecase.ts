import { ResponseDTO } from "../../../../domain/dtos/response";
import { ITokenRepository } from "../../../repositories/token.repository";

import { ILogoutRequestDTO } from "../../../../domain/dtos/auth/logut-auth-dto";
import { ILogoutUseCase } from "../interfaces/logout-auth.usecase";
import { formatErrorResponse } from "../../../../presentation/http/utils";

export class LogoutUseCase implements ILogoutUseCase {
  constructor(private refreshTokenRepository: ITokenRepository) {}

  async execute({ userId, role }: ILogoutRequestDTO): Promise<ResponseDTO> {
    try {
      const refreshTokenFounded =
        await this.refreshTokenRepository.findByUserIdAndType(
          userId,
          "refresh"
        );

      if (refreshTokenFounded) {
        await this.refreshTokenRepository.delete(userId);
      }

      return { data: { token: refreshTokenFounded }, success: true };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
