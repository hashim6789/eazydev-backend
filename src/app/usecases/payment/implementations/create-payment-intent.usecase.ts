import { ResponseDTO } from "../../../../domain/dtos";
import { PaymentErrorType } from "../../../../domain/enums";
import { formatErrorResponse } from "../../../../presentation/http/utils";
import { ICourseRepository } from "../../../../infra/repositories";
import { ICreatePaymentIntentUseCase } from "../interfaces";
import Stripe from "stripe";

export class CreatePaymentIntentUseCase implements ICreatePaymentIntentUseCase {
  constructor(
    private courseRepository: ICourseRepository,
    private stripe: Stripe
  ) {}

  async execute(courseId: string): Promise<ResponseDTO> {
    try {
      console.log("courseId", courseId);

      const course = await this.courseRepository.findById(courseId);
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

      const paymentIntent = await this.stripe.paymentIntents.create({
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
