import { ResponseDTO } from "../../../../domain/dtos/response";
import { ITokenRepository } from "../../../../infra/repositories";
import { TokenDTO } from "../../../../domain/dtos/auth/refresh-token-dto";
import { IGetResetPageUseCase } from "../interfaces";
import { TokenErrorType } from "../../../../domain/enums/token";
import { formatErrorResponse } from "../../../../presentation/http/utils";
import { IGetResetPageRequestDTO } from "../../../../domain/dtos";

export class GetResetPageUseCase implements IGetResetPageUseCase {
  constructor(private _tokenRepository: ITokenRepository) {}

  async execute({
    tokenId,
    role,
  }: IGetResetPageRequestDTO): Promise<ResponseDTO> {
    try {
      const resetToken = (await this._tokenRepository.findById(
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
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
