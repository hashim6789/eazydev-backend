import {
  ICreatePurchaseRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";
import { ProgressEntity } from "../../../../domain/entities/progress";
import { PurchaseEntity } from "../../../../domain/entities/purchase";
import {
  AuthenticateUserErrorType,
  ChatGroupErrorType,
  CourseErrorType,
  PurchaseErrorType,
} from "../../../../domain/enums";
import {
  IChatGroupRepository,
  ICourseRepository,
  IProgressRepository,
  IPurchaseRepository,
} from "../../../../infra/repositories";
import { ICreatePurchaseUseCase } from "../interfaces";
import { formatErrorResponse } from "../../../../presentation/http/utils";

export class CreatePurchaseUseCases implements ICreatePurchaseUseCase {
  constructor(
    private purchaseRepository: IPurchaseRepository,
    private courseRepository: ICourseRepository,
    private progressRepository: IProgressRepository,
    private chatGroupRepository: IChatGroupRepository
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

      const progress = ProgressEntity.create({
        userId: learnerId,
        courseId,
        mentorId: course.mentorId,
        completedLessons: [],
        completedMaterials: [],
        isCourseCompleted: false,
        progress: 0,
        completedDate: null,
      });

      const isAddedToChatGroup =
        await this.chatGroupRepository.addLearnerToChatGroup(
          courseId,
          learnerId
        );
      if (!isAddedToChatGroup) {
        return {
          data: { error: ChatGroupErrorType.ChatGroupNotFound },
          success: false,
        };
      }

      //create the progress of the course of the corresponding learner is created
      await this.progressRepository.create(progress);

      return { data: createdPurchase, success: true };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
