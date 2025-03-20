import {
  ICreateSlotRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";

export interface ICreateSlotUseCase {
  execute(data: ICreateSlotRequestDTO, authData: Payload): Promise<ResponseDTO>;
}
