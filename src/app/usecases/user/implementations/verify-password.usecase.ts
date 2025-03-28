import { ResponseDTO } from "../../../../domain/dtos/response";
import {
  IUserValidDTO,
  IVerifyPasswordRequestDTO,
  Payload,
} from "../../../../domain/dtos";
import { UserErrorType } from "../../../../domain/enums/user";
import { IUsersRepository } from "../../../repositories/user.repository";
import { IVerifyPasswordUseCase } from "../interfaces";
import { IPasswordHasher } from "../../../providers";
import { AuthenticateUserErrorType } from "../../../../domain/enums";

export class VerifyPasswordUseCase implements IVerifyPasswordUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private passwordHasher: IPasswordHasher
  ) {}

  async execute(
    { currentPassword }: IVerifyPasswordRequestDTO,
    { userId }: Payload
  ): Promise<ResponseDTO> {
    try {
      const user = (await this.userRepository.findById(
        userId
      )) as IUserValidDTO | null;
      if (!user) {
        return { success: false, data: { error: UserErrorType.UserNotFound } };
      }

      const isValid = await this.passwordHasher.compare(
        currentPassword,
        user.password
      );
      if (!isValid) {
        return {
          success: false,
          data: { error: AuthenticateUserErrorType.PasswordNotValid },
        };
      }

      return { success: true, data: user };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
