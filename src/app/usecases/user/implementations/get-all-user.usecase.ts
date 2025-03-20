import { ResponseDTO } from "../../../../domain/dtos/response";
import { QueryUser } from "../../../../domain/dtos/user";
import { UserErrorType } from "../../../../domain/enums/user";

import { IUsersRepository } from "../../../repositories/user.repository";
import { IGetAllUserUseCase } from "../interfaces/get-all-user.usecase";

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
