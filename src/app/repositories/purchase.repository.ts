import {
  ICreatePurchaseInDTO,
  IPurchaseOutDTO,
  IPurchaseOutPopulatedDTO,
} from "../../domain/dtos";
import { PaginationDTO } from "../../domain/dtos/pagination.dtos";
import { MonthlyRevenueData } from "../../domain/types";

export interface IPurchaseRepository {
  create(data: ICreatePurchaseInDTO): Promise<IPurchaseOutDTO>;
  findById(id: string): Promise<IPurchaseOutPopulatedDTO | null>;
  findAllByUser(userId: string): Promise<PaginationDTO | null>;
  analyzeMonthlyRevenue(): Promise<MonthlyRevenueData[]>;
}
