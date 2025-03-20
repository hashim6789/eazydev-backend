import {
  IProgressOutDTO,
  IPurchaseOutDTO,
  QueryProgress,
} from "../../domain/dtos";
import { PaginationDTO } from "../../domain/dtos/pagination.dtos";
import { ProgressEntity } from "../../domain/entities/progress";
import { PurchaseEntity } from "../../domain/entities/purchase";

export interface IProgressRepository {
  create(data: ProgressEntity): Promise<IProgressOutDTO>;
  findAllByUserId(query: QueryProgress, userId: string): Promise<PaginationDTO>;
}
