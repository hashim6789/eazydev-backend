import { ResponseDTO } from "../../../../domain/dtos";
import { PaymentErrorType } from "../../../../domain/enums";
import { ICourseRepository, IPaymentRepository } from "../../../repositories";
import { ICreatePaymentIntentUseCase } from "../interfaces";
import Stripe from "stripe";

export class CreatePaymentIntentUseCase implements ICreatePaymentIntentUseCase {
  constructor(
    private courseRepository: ICourseRepository, // Repository abstraction for payment-related operations
    private stripe: Stripe // Injected Stripe instance
  ) {}

  async execute(courseId: string): Promise<ResponseDTO> {
    try {
      console.log("courseId", courseId);
      // Validate input data
      //   if (!amount || !currency) {
      //     return {
      //       success: false,
      //       data: { error: PaymentErrorType.InvalidPaymentDetails },
      //     };
      //   }

      // Fetch course details from the repository (to confirm price or availability)
      const course = await this.courseRepository.findById(courseId);
      if (!course) {
        return {
          success: false,
          data: { error: PaymentErrorType.CourseNotFound },
        };
      }

      // Ensure the course is available for purchase
      if (course.status !== "published") {
        return {
          success: false,
          data: { error: PaymentErrorType.CourseUnavailable },
        };
      }

      // Create the Payment Intent via Stripe
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: course.price * 100, // Stripe expects amount in the smallest currency unit (e.g., cents for USD)
        currency: "usd",
        metadata: {
          courseId,
          courseTitle: course.title,
        },
      });

      // Return the client secret and payment intent information
      return {
        success: true,
        data: {
          clientSecret: paymentIntent.client_secret,
          paymentIntentId: paymentIntent.id,
        },
      };
    } catch (error: any) {
      // Log the error if needed, and return structured error response
      console.error("Error while creating Payment Intent:", error);
      return {
        success: false,
        data: { error: error.message || PaymentErrorType.InternalError },
      };
    }
  }
}
