import Stripe from "stripe";
import { ICourseRepository } from "../../../repositories";

import { CreatePaymentIntentUseCase } from "../../../../app/usecases/payment/implementations/create-payment-intent.usecase";
import { ICreatePaymentIntentUseCase } from "../../../../app/usecases/payment/interfaces";
import {
  CreatePaymentIntentController,
  IController,
} from "../../../../presentation/http/controllers";
import { CourseModel } from "../../../databases/models";
import { CourseRepository } from "../../../repositories/implementations";
import { env } from "../../../../presentation/express/configs/env.config";

export function createPaymentIntendComposer(): IController {
  const repository: ICourseRepository = new CourseRepository(CourseModel);
  const stripe = new Stripe(env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-02-24.acacia",
  });

  const useCase: ICreatePaymentIntentUseCase = new CreatePaymentIntentUseCase(
    repository,
    stripe
  );
  const controller: IController = new CreatePaymentIntentController(useCase);
  return controller;
}
