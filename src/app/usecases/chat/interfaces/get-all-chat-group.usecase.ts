import { Payload, ResponseDTO } from "../../../../domain/dtos";

export interface IGetAllChatGroupUseCase {
  execute(authData: Payload): Promise<ResponseDTO>;
}
