import {
  IBookSlotRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";

export interface IBookSlotUseCase {
  execute(data: IBookSlotRequestDTO, authData: Payload): Promise<ResponseDTO>;
}
