import {
  ICreatePurchaseRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";
import { PurchaseEntity } from "../../../../domain/entities/purchase";
import {
  AuthenticateUserErrorType,
  CourseErrorType,
  PurchaseErrorType,
} from "../../../../domain/enums";
import { ICourseRepository, IPurchaseRepository } from "../../../repositories";
import { ICreatePurchaseUseCase } from "../interfaces";

export class CreatePurchaseUseCases implements ICreatePurchaseUseCase {
  constructor(
    private purchaseRepository: IPurchaseRepository,
    private courseRepository: ICourseRepository
  ) {}

  generatePurchaseId(learnerId: string, courseId: string): string {
    const learnerFragment = learnerId.slice(0, 4) + learnerId.slice(-4);
    const courseFragment = courseId.slice(0, 4) + courseId.slice(-4);

    const timestamp = Date.now();

    const purchaseId = `EZD${learnerFragment}${courseFragment}${timestamp}`
      .replace(/[^A-Za-z0-9]/g, "") // Remove non-alphanumeric characters
      .toUpperCase(); // Convert to uppercase

    return purchaseId;
  }

  async execute(
    { learnerId, courseId, paymentIntentId, amount }: ICreatePurchaseRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO> {
    try {
      if (learnerId !== authData.userId) {
        return {
          data: { error: AuthenticateUserErrorType.UserCanNotDoIt },
          success: false,
        };
      }

      const course = await this.courseRepository.findById(courseId);
      if (!course) {
        return {
          data: { error: CourseErrorType.CourseNotFound },
          success: false,
        };
      }

      if (course.price * 100 !== amount) {
        return {
          data: { error: PurchaseErrorType.InvalidPurchaseDetails },
          success: false,
        };
      }

      const purchaseId = this.generatePurchaseId(learnerId, courseId);
      const purchase = PurchaseEntity.create({
        learnerId,
        purchaseId,
        courseId,
        paymentIntentId,
        amount,
        status: "completed",
        purchaseDate: Date.now(),
      });

      const createdPurchase = await this.purchaseRepository.create(purchase);

      return { data: createdPurchase, success: true };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
