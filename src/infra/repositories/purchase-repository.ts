import { Model } from "mongoose";
import { IPurchaseRepository } from "../../app/repositories";
import { IPurchase } from "../databases/interfaces";
import { ICreatePurchaseInDTO, IPurchaseOutDTO } from "../../domain/dtos";

export class PurchaseRepository implements IPurchaseRepository {
  private model: Model<IPurchase>;

  constructor(model: Model<IPurchase>) {
    this.model = model;
  }

  async create(data: ICreatePurchaseInDTO): Promise<IPurchaseOutDTO> {
    try {
      const createData = new this.model({
        learnerId: data.learnerId,
        purchaseId: data.purchaseId,
        courseId: data.courseId,
        paymentIntentId: data.paymentIntentId,
        status: data.status,
        amount: data.amount,
        purchaseDate: data.purchaseDate,
      });
      const purchase = await createData.save();

      return {
        id: purchase._id.toString(),
        learnerId: purchase.learnerId.toString(),
        courseId: purchase.courseId.toString(),
        purchaseId: purchase.purchaseId,
        paymentIntentId: purchase.paymentIntentId,
        status: purchase.status,
        amount: purchase.amount,
        purchaseDate: purchase.purchaseDate.getTime(),
      };
    } catch (error) {
      console.error("Error while creating purchase:", error);
      throw new Error("Purchase creation failed");
    }
  }
}
