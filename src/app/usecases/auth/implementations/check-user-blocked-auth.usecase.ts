import { ResponseDTO } from "../../../../domain/dtos/response";
import { AuthenticateUserErrorType } from "../../../../domain/enums/auth";
import { IUserValidDTO, Payload } from "../../../../domain/dtos";
import { IUsersRepository } from "../../../../infra/repositories";
import { formatErrorResponse } from "../../../../presentation/http/utils";
import { UserErrorType } from "../../../../domain/enums";

export class CheckUserBlockedUseCase {
  constructor(private _userRepository: IUsersRepository) {}

  async execute({ userId }: Payload): Promise<ResponseDTO> {
    try {
      const user = (await this._userRepository.findById(
        userId
      )) as IUserValidDTO | null;

      if (!user) {
        return {
          data: { error: UserErrorType.UserNotFound },
          success: false,
        };
      }

      if (user.isBlocked || !user.isVerified) {
        return {
          data: { error: AuthenticateUserErrorType.UserNotVerifiedOrBlocked },
          success: false,
        };
      }

      return {
        data: {},
        success: true,
      };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
