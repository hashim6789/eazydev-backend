import { ResponseDTO } from "../../../../domain/dtos/response.dtos";
import { QueryUser } from "../../../../domain/dtos/user";
import { UserErrorType } from "../../../../domain/enums/user/error-type.enum";

import { IUsersRepository } from "../../../repositories/user.repository";
import { IGetAllUserUseCase } from "../get-all-user.usecase";

export class GetAllUserUseCase implements IGetAllUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(query: QueryUser): Promise<ResponseDTO> {
    try {
      const users = await this.userRepository.findAll(query);
      if (users.total === 0) {
        return { success: false, data: { error: UserErrorType.UserNotFound } };
      }

      return { success: true, data: users };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
