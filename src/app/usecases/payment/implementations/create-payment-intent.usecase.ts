import { IUserOut, Payload, ResponseDTO } from "../../../../domain/dtos";
import {
  AuthenticateUserErrorType,
  PaymentErrorType,
} from "../../../../domain/enums";
import { formatErrorResponse } from "../../../../presentation/http/utils";
import {
  ICourseRepository,
  IProgressRepository,
  IUsersRepository,
} from "../../../../infra/repositories";
import { ICreatePaymentIntentUseCase } from "../interfaces";
import Stripe from "stripe";

export class CreatePaymentIntentUseCase implements ICreatePaymentIntentUseCase {
  constructor(
    private _courseRepository: ICourseRepository,
    private _userRepository: IUsersRepository,
    private _progressRepository: IProgressRepository,
    private _stripe: Stripe
  ) {}

  async execute(
    courseId: string,
    { userId, role }: Payload
  ): Promise<ResponseDTO> {
    try {
      //console.log("courseId", courseId);

      if (role !== "learner") {
        return {
          success: false,
          data: { error: AuthenticateUserErrorType.UserCanNotDoIt },
        };
      }

      const learner = (await this._userRepository.findById(
        userId
      )) as IUserOut | null;
      if (!learner) {
        return {
          success: false,
          data: { error: AuthenticateUserErrorType.UserCanNotDoIt },
        };
      }

      const course = await this._courseRepository.findById(courseId);
      if (!course) {
        return {
          success: false,
          data: { error: PaymentErrorType.CourseNotFound },
        };
      }

      if (course.status !== "published") {
        return {
          success: false,
          data: { error: PaymentErrorType.CourseUnavailable },
        };
      }

      const existingProgress = await this._progressRepository.findOne({
        userId,
        courseId,
      });

      if (existingProgress) {
        return {
          success: false,
          data: { error: PaymentErrorType.CourseAlreadyPurchased },
        };
      }

      const paymentIntent = await this._stripe.paymentIntents.create({
        amount: course.price * 100,
        currency: "usd",
        metadata: {
          courseId,
          courseTitle: course.title,
        },
      });

      return {
        success: true,
        data: {
          clientSecret: paymentIntent.client_secret,
          paymentIntentId: paymentIntent.id,
        },
      };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
