import { IGetUserRequestDTO, IUserDetailOutDTO } from "../../../../domain/dtos";
import { ResponseDTO } from "../../../../domain/dtos/response";

import { UserErrorType } from "../../../../domain/enums/user";

import { IUsersRepository } from "../../../repositories/user.repository";
import { IGetUserUseCase } from "../interfaces/get-user.uscase";

export class GetUserUseCase implements IGetUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute({ userId, role }: IGetUserRequestDTO): Promise<ResponseDTO> {
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
