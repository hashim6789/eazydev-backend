import { ResponseDTO } from "../../../../domain/dtos/response";
import {
  IUpdatePersonalInfoRequestDTO,
  Payload,
} from "../../../../domain/dtos";
import { UserErrorType } from "../../../../domain/enums/user";
import { IUsersRepository } from "../../../repositories/user.repository";
import { IUpdatePersonalInfoUseCase } from "../interfaces";
import { formatErrorResponse } from "../../../../presentation/http/utils";

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
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
