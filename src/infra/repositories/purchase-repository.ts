import { Model } from "mongoose";
import { IPurchaseRepository } from "../../app/repositories";
import { IPurchase } from "../databases/interfaces";
import {
  ICreatePurchaseInDTO,
  IPurchaseOutDTO,
  IPurchaseOutPopulatedDTO,
} from "../../domain/dtos";
import { PaginationDTO } from "../../domain/dtos/pagination.dtos";

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

  async findById(id: string): Promise<IPurchaseOutPopulatedDTO | null> {
    try {
      const purchase = await this.model
        .findById(id)
        .populate("courseId", "title");
      if (!purchase) return null;

      const { title, _id: courseId } = purchase.courseId as unknown as {
        title: string;
        _id: string;
      };
      return {
        id: purchase._id.toString(),
        learnerId: purchase.learnerId.toString(),
        course: { title, id: courseId },
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

  async findAllByUser(userId: string): Promise<PaginationDTO | null> {
    try {
      // Fetch purchases with query, pagination, and sorting
      const purchases = await this.model
        .find({ learnerId: userId })

        .lean();
      return {
        body: purchases.map((purchase) => {
          const { title, _id: courseId } = purchase.courseId as unknown as {
            title: string;
            _id: string;
          };
          return {
            id: purchase._id.toString(),
            learnerId: purchase.learnerId.toString(),
            course: { title, id: courseId },
            purchaseId: purchase.purchaseId,
            paymentIntentId: purchase.paymentIntentId,
            status: purchase.status,
            amount: purchase.amount,
            purchaseDate: purchase.purchaseDate.getTime(),
          };
        }),
        total: 0,
        page: 0,
        last_page: 0,
      };
    } catch (error) {
      console.error("Error while fetching purchases:", error);
      throw new Error("Course fetch failed");
    }
  }
}
