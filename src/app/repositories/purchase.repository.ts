import {
  ICreatePurchaseInDTO,
  IPurchaseOutDTO,
  IPurchaseOutPopulatedDTO,
} from "../../domain/dtos";

export interface IPurchaseRepository {
  create(data: ICreatePurchaseInDTO): Promise<IPurchaseOutDTO>;
  findById(id: string): Promise<IPurchaseOutPopulatedDTO | null>;
}
