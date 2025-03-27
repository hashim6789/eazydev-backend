import { ResponseDTO } from "../../../../domain/dtos/response";
import {
  IUpdatePersonalInfoRequestDTO,
  Payload,
} from "../../../../domain/dtos";

export interface IUpdatePersonalInfoUseCase {
  execute(
    data: IUpdatePersonalInfoRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO>;
}
