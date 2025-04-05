import { ResponseDTO } from "../../../../domain/dtos/response";
import {
  IUpdateProfilePictureRequestDTO,
  Payload,
} from "../../../../domain/dtos";
import { UserErrorType } from "../../../../domain/enums/user";
import { IUsersRepository } from "../../../repositories/user.repository";
import { IUpdateProfilePictureUseCase } from "../interfaces";

export class UpdateProfilePictureUseCase
  implements IUpdateProfilePictureUseCase
{
  constructor(private userRepository: IUsersRepository) {}

  async execute(
    { profilePicture }: IUpdateProfilePictureRequestDTO,
    { userId }: Payload
  ): Promise<ResponseDTO> {
    try {
      const user = await this.userRepository.update(userId, {
        profilePicture,
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
