import {
  IGetAllNotificationRequestDTO,
  ResponseDTO,
} from "../../../../domain/dtos";
import { INotificationRepository } from "../../../../infra/repositories";
import { IGetAllNotificationUseCase } from "../interfaces";
import { formatErrorResponse } from "../../../../presentation/http/utils";

export class GetAllNotificationUseCase implements IGetAllNotificationUseCase {
  constructor(private _notificationRepository: INotificationRepository) {}

  async execute(query: IGetAllNotificationRequestDTO): Promise<ResponseDTO> {
    try {
      const notifications =
        await this._notificationRepository.findAllByRecipientId(
          query.recipientId
        );

      return { data: notifications, success: true };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
