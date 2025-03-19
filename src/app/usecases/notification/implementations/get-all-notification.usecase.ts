import {
  IGetAllNotificationRequestDTO,
  ResponseDTO,
} from "../../../../domain/dtos";
import { INotificationRepository } from "../../../repositories";
import { IGetAllNotificationUseCase } from "../interfaces";

export class GetAllNotificationUseCase implements IGetAllNotificationUseCase {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute(query: IGetAllNotificationRequestDTO): Promise<ResponseDTO> {
    try {
      const notifications =
        await this.notificationRepository.findAllByRecipientId(
          query.recipientId
        );

      return { data: notifications, success: true };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
