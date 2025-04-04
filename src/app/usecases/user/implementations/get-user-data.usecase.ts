import { IGetUserDataRequestDTO } from "../../../../domain/dtos";
import { ResponseDTO } from "../../../../domain/dtos/response";
import { UserErrorType } from "../../../../domain/enums/user";
import { IUsersRepository } from "../../../repositories/user.repository";
import { IGetUserDataUseCase } from "../interfaces";

export class GetUserDataUseCase implements IGetUserDataUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute({
    id,
    userRole,
  }: IGetUserDataRequestDTO): Promise<ResponseDTO> {
    try {
      const userData = await this.userRepository.getUserData(id, userRole);
      console.log(" usercase", userData);
      if (!userData) {
        return {
          success: false,
          data: { error: UserErrorType.UserNotFound },
        };
      }

      return { success: true, data: userData };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
