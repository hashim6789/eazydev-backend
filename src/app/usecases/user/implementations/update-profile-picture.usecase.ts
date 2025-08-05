import { ResponseDTO } from "../../../../domain/dtos/response";
import {
  IUpdateProfilePictureRequestDTO,
  Payload,
} from "../../../../domain/dtos";
import { UserErrorType } from "../../../../domain/enums/user";
import { IUsersRepository } from "../../../../infra/repositories";
import { IUpdateProfilePictureUseCase } from "../interfaces";
import { formatErrorResponse } from "../../../../presentation/http/utils";

export class UpdateProfilePictureUseCase
  implements IUpdateProfilePictureUseCase
{
  constructor(private _userRepository: IUsersRepository) {}

  async execute(
    { profilePicture }: IUpdateProfilePictureRequestDTO,
    { userId }: Payload
  ): Promise<ResponseDTO> {
    try {
      const user = await this._userRepository.update(userId, {
        profilePicture,
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
