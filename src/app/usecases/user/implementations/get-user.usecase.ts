import { ResponseDTO } from "../../../../domain/dtos/response";
import { GetUserRequestDTO } from "../../../../domain/dtos/user/get-user-request.dto";
import { IUserDetailOutDTO } from "../../../../domain/dtos/user/user.dto";
import { UserErrorType } from "../../../../domain/enums/user";

import { IUsersRepository } from "../../../repositories/user.repository";
import { IGetUserUseCase } from "../get-user.uscase";

export class GetUserUseCase implements IGetUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute({ userId, role }: GetUserRequestDTO): Promise<ResponseDTO> {
    try {
      const user = (await this.userRepository.findById(
        userId
      )) as IUserDetailOutDTO | null;
      if (!user) {
        return {
          success: false,
          data: { error: UserErrorType.UserNotFound },
        };
      }

      return { success: true, data: user };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
