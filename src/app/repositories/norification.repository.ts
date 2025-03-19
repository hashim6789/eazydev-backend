import {
  ICreateNotificationInDTO,
  INotificationOutDTO,
} from "../../domain/dtos";

export interface INotificationRepository {
  create(data: ICreateNotificationInDTO): Promise<INotificationOutDTO>;
}
