import {
  IGetAllNotificationRequestDTO,
  ResponseDTO,
} from "../../../../domain/dtos";

export interface IGetAllNotificationUseCase {
  execute(query: IGetAllNotificationRequestDTO): Promise<ResponseDTO>;
}
