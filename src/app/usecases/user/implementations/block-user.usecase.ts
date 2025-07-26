import { ResponseDTO } from "../../../../domain/dtos/response";
import { BlockUserRequestDTO } from "../../../../domain/dtos";
import { UserErrorType } from "../../../../domain/enums/user";
import { formatErrorResponse } from "../../../../presentation/http/utils";
import { IUsersRepository } from "../../../repositories/user.repository";
import { IBlockUserUseCase } from "../interfaces/block-user.usecase";

export class BlockUserUseCase implements IBlockUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute({ userId, change }: BlockUserRequestDTO): Promise<ResponseDTO> {
    try {
      const blockedUser = await this.userRepository.update(userId, {
        isBlocked: change,
      });

      if (!blockedUser) {
        return {
          success: false,
          data: { error: UserErrorType.UserNotFound },
        };
      }
      return {
        success: true,
        data: change,
      };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
