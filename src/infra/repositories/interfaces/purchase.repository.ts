import {
  ICreatePurchaseInDTO,
  IPurchaseOutDTO,
  IPurchaseOutPopulatedDTO,
  SimplePagination,
} from "../../../domain/dtos";
import { PaginationDTO } from "../../../domain/dtos";
import {
  MentorRevenue,
  MonthlyRevenueData,
  RevenueData,
} from "../../../domain/types";
import { IPurchase } from "../../databases/interfaces";

export interface IPurchaseRepository {
  create(data: ICreatePurchaseInDTO): Promise<IPurchaseOutDTO>;
  findById(id: string): Promise<IPurchaseOutPopulatedDTO | null>;
  findAllByUser(
    userId: string,
    query: SimplePagination
  ): Promise<PaginationDTO | null>;
  analyzeMonthlyRevenue(): Promise<MonthlyRevenueData[]>;
  analyzeAdminRevenue(): Promise<RevenueData>;
  analyzeMentorRevenue(mentorId: string): Promise<MentorRevenue>;
  findOne(filter: Partial<ICreatePurchaseInDTO>): Promise<IPurchase | null>;
}
