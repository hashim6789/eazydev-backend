import { ResponseDTO } from "../../../../domain/dtos/response";
import {
  IChangePasswordRequestDTO,
  IUserValidDTO,
  IVerifyPasswordRequestDTO,
  Payload,
} from "../../../../domain/dtos";
import { UserErrorType } from "../../../../domain/enums/user";
import { IUsersRepository } from "../../../../infra/repositories";
import { IChangePasswordUseCase, IVerifyPasswordUseCase } from "../interfaces";
import { AuthenticateUserErrorType } from "../../../../domain/enums";
import { formatErrorResponse } from "../../../../presentation/http/utils";
import { IPasswordHasher } from "../../../../infra/providers";

export class ChangePasswordUseCase implements IChangePasswordUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private passwordHasher: IPasswordHasher
  ) {}

  async execute(
    { newPassword }: IChangePasswordRequestDTO,
    { userId }: Payload
  ): Promise<ResponseDTO> {
    try {
      if (newPassword.length < 6) {
        return {
          success: false,
          data: { error: UserErrorType.newPasswordNotValid },
        };
      }
      const user = (await this.userRepository.findById(
        userId
      )) as IUserValidDTO | null;
      if (!user) {
        return { success: false, data: { error: UserErrorType.UserNotFound } };
      }

      const hashedPassword = await this.passwordHasher.hash(newPassword);
      const updatedPassword = await this.userRepository.update(userId, {
        password: hashedPassword,
      });
      if (!updatedPassword) {
        return {
          success: false,
          data: { error: UserErrorType.UserCantUpdate },
        };
      }

      return { success: true, data: user };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
