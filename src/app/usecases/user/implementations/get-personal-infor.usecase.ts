import { ResponseDTO } from "../../../../domain/dtos/response";
import {
  IGetPersonalInfoRequestDTO,
  IUserDetailOutDTO,
} from "../../../../domain/dtos";
import { UserErrorType } from "../../../../domain/enums/user";
import { IUsersRepository } from "../../../repositories/user.repository";
import { IGetPersonalInfoUseCase } from "../interfaces";

export class GetPersonalInfoUseCase implements IGetPersonalInfoUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute({
    userId,
    role,
  }: IGetPersonalInfoRequestDTO): Promise<ResponseDTO> {
    try {
      const user = (await this.userRepository.findById(
        userId
      )) as IUserDetailOutDTO | null;
      if (!user) {
        return { success: false, data: { error: UserErrorType.UserNotFound } };
      }

      return { success: true, data: user };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
