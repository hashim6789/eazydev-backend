import {
  // ICreateNotificationInDTO,
  INotificationOutDTO,
} from "../../../domain/dtos";
import { INotification } from "../../databases/interfaces";
import { IBaseRepository } from "./base.repository";

export interface INotificationRepository
  extends IBaseRepository<INotification> {
  // create(data: ICreateNotificationInDTO): Promise<INotificationOutDTO>;
  findAllByRecipientId(id: string): Promise<INotificationOutDTO[]>;
}
