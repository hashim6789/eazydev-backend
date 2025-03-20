import { IProgressOutDTO, IPurchaseOutDTO } from "../../domain/dtos";
import { ProgressEntity } from "../../domain/entities/progress";
import { PurchaseEntity } from "../../domain/entities/purchase";

export interface IProgressRepository {
  create(data: ProgressEntity): Promise<IProgressOutDTO>;
}
