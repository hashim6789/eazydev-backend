import { ResponseDTO } from "../../../../domain/dtos/response";
import {
  IGetPersonalInfoRequestDTO,
  IUpdatePersonalInfoRequestDTO,
  IUserDetailOutDTO,
  Payload,
} from "../../../../domain/dtos";
import { UserErrorType } from "../../../../domain/enums/user";
import { IUsersRepository } from "../../../repositories/user.repository";
import {
  IGetPersonalInfoUseCase,
  IUpdatePersonalInfoUseCase,
} from "../interfaces";

export class UpdatePersonalInfoUseCase implements IUpdatePersonalInfoUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(
    { firstName, lastName }: IUpdatePersonalInfoRequestDTO,
    { userId }: Payload
  ): Promise<ResponseDTO> {
    try {
      const user = await this.userRepository.update(userId, {
        firstName,
        lastName,
      });
      if (!user) {
        return { success: false, data: { error: UserErrorType.UserNotFound } };
      }

      return { success: true, data: user };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
