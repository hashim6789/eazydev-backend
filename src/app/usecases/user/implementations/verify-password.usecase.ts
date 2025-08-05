import { ResponseDTO } from "../../../../domain/dtos/response";
import {
  IUserValidDTO,
  IVerifyPasswordRequestDTO,
  Payload,
} from "../../../../domain/dtos";
import { UserErrorType } from "../../../../domain/enums/user";
import { IUsersRepository } from "../../../../infra/repositories";
import { IVerifyPasswordUseCase } from "../interfaces";
import { AuthenticateUserErrorType } from "../../../../domain/enums";
import { formatErrorResponse } from "../../../../presentation/http/utils";
import { IPasswordHasher } from "../../../../infra/providers";

export class VerifyPasswordUseCase implements IVerifyPasswordUseCase {
  constructor(
    private _userRepository: IUsersRepository,
    private _passwordHasher: IPasswordHasher
  ) {}

  async execute(
    { currentPassword }: IVerifyPasswordRequestDTO,
    { userId }: Payload
  ): Promise<ResponseDTO> {
    try {
      const user = (await this._userRepository.findById(
        userId
      )) as IUserValidDTO | null;
      if (!user) {
        return { success: false, data: { error: UserErrorType.UserNotFound } };
      }

      const isValid = await this._passwordHasher.compare(
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
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
