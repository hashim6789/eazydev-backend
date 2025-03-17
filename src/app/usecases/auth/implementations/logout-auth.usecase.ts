import { ResponseDTO } from "../../../../domain/dtos/response";
import { IRefreshTokenRepository } from "../../../repositories/refresh-token.repository";

import { ILogoutRequestDTO } from "../../../../domain/dtos/auth/logut-auth-dto";
import { ILogoutUseCase } from "../logout-auth.usecase";

export class LogoutUseCase implements ILogoutUseCase {
  constructor(private refreshTokenRepository: IRefreshTokenRepository) {}

  async execute({ userId, role }: ILogoutRequestDTO): Promise<ResponseDTO> {
    try {
      const refreshTokenFounded =
        await this.refreshTokenRepository.findByUserId(userId);

      if (refreshTokenFounded) {
        await this.refreshTokenRepository.delete(userId);
      }

      return { data: { token: refreshTokenFounded }, success: true };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
