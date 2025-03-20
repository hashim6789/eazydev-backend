import {
  IGetAllSlotRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";

export interface IGetAllSlotUseCase {
  execute(
    // query: IGetAllSlotRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO>;
}
