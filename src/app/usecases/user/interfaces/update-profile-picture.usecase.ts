import { ResponseDTO } from "../../../../domain/dtos/response";
import {
  IUpdateProfilePictureRequestDTO,
  Payload,
} from "../../../../domain/dtos";

export interface IUpdateProfilePictureUseCase {
  execute(
    data: IUpdateProfilePictureRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO>;
}
