import { Payload, ResponseDTO } from "../../../../domain/dtos";

export interface IGetAllSlotUseCase {
  execute(authData: Payload): Promise<ResponseDTO>;
}
