import { Model } from "mongoose";
import { IPurchase } from "../../databases/interfaces";
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
import {
  adminRevenueAnalysisPipeline,
  monthlyRevenuePopulatedPipeline,
} from "../../pipelines";
import { mentorRevenuePipeline } from "../../pipelines/purchase";
import { IPurchaseRepository } from "../interfaces";
import { mapDocumentToPurchase } from "../../databases/mappers";

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

  async findAllByUser(
    userId: string,
    { page = "1", limit = "5" }: SimplePagination
  ): Promise<PaginationDTO | null> {
    try {
      const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
      const limitParsed = parseInt(limit, 10);

      // Fetch purchases with query, pagination, and sorting
      const purchases = await this.model
        .find({ learnerId: userId })
        .populate("courseId", "title")
        .skip(skip)
        .limit(limitParsed);
      if (!purchases) return null;
      const total = await this.model.countDocuments({ learnerId: userId });
      return {
        body: purchases.map(mapDocumentToPurchase),
        total,
        page: parseInt(page, 10),
        last_page: Math.ceil(total / limitParsed),
      };
    } catch (error) {
      console.error("Error while fetching purchases:", error);
      throw new Error("Course fetch failed");
    }
  }

  async analyzeMonthlyRevenue(): Promise<MonthlyRevenueData[]> {
    try {
      const result = await this.model.aggregate(
        monthlyRevenuePopulatedPipeline()
      );

      return result as MonthlyRevenueData[];
    } catch (error) {
      console.error("Error while analyzing monthly revenue purchases:", error);
      throw new Error("revenue fetch failed");
    }
  }

  async analyzeAdminRevenue(): Promise<RevenueData> {
    try {
      const result = await this.model.aggregate(adminRevenueAnalysisPipeline());

      return result[0] as RevenueData;
    } catch (error) {
      console.error("Error while analyzing monthly revenue purchases:", error);
      throw new Error("revenue fetch failed");
    }
  }

  async analyzeMentorRevenue(mentorId: string): Promise<MentorRevenue> {
    try {
      const result = await this.model.aggregate(
        mentorRevenuePipeline(mentorId)
      );

      return result[0] as MentorRevenue;
    } catch (error) {
      console.error("Error while analyzing monthly revenue purchases:", error);
      throw new Error("revenue fetch failed");
    }
  }

  async findOne(
    filter: Partial<ICreatePurchaseInDTO>
  ): Promise<IPurchase | null> {
    try {
      const purchase = await this.model.findOne(filter);
      if (!purchase) return null;

      if (!purchase) return null;
      return purchase;
    } catch (error) {
      console.error("Error while creating purchase:", error);
      throw new Error("Purchase creation failed");
    }
  }
}
