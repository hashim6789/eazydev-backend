import { ICreatePurchaseInDTO, IPurchaseOutDTO } from "../../domain/dtos";

export interface IPurchaseRepository {
  create(data: ICreatePurchaseInDTO): Promise<IPurchaseOutDTO>;
}
