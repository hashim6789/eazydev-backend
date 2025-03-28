import { ResponseDTO } from "../../../../domain/dtos/response";
import { ITokenRepository } from "../../../repositories/token.repository";
import { TokenDTO } from "../../../../domain/dtos/auth/refresh-token-dto";
import { IGetResetPageUseCase } from "../interfaces";
import { IGetResetPageRequestDTO } from "../../../../domain/dtos/auth/vefiry-otp-auth.dto";
import { TokenErrorType } from "../../../../domain/enums/token";

export class GetResetPageUseCase implements IGetResetPageUseCase {
  constructor(private tokenRepository: ITokenRepository) {}

  async execute({
    tokenId,
    role,
  }: IGetResetPageRequestDTO): Promise<ResponseDTO> {
    try {
      const resetToken = (await this.tokenRepository.findById(
        tokenId
      )) as TokenDTO | null;
      if (!resetToken) {
        return {
          data: { error: TokenErrorType.TokenNotFound },
          success: false,
        };
      }
      if (
        resetToken.type !== "reset" ||
        resetToken.role !== role
        // || resetToken.expiresIn < Date.now()
      ) {
        return {
          data: { error: TokenErrorType.TokenIsNotValid },
          success: false,
        };
      }

      return {
        data: { tokenId },
        success: true,
      };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
