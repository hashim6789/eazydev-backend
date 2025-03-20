import {
  IUpdateProgressRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";

export interface IUpdateProgressUseCase {
  execute(
    data: IUpdateProgressRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO>;
}
