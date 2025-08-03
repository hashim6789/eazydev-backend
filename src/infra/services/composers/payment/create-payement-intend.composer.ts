import Stripe from "stripe";
import {
  ICourseRepository,
  IProgressRepository,
  IUsersRepository,
} from "../../../repositories";
import { CreatePaymentIntentUseCase } from "../../../../app/usecases/payment/implementations/create-payment-intent.usecase";
import { ICreatePaymentIntentUseCase } from "../../../../app/usecases/payment/interfaces";
import {
  CreatePaymentIntentController,
  IController,
} from "../../../../presentation/http/controllers";
import {
  CourseModel,
  ProgressModel,
  UserModel,
} from "../../../databases/models";
import {
  CourseRepository,
  ProgressRepository,
  UserRepository,
} from "../../../repositories/implementations";
import { env } from "../../../../presentation/express/configs/env.config";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function createPaymentIntendComposer(): IController {
  const repository: ICourseRepository = new CourseRepository(CourseModel);
  const progressRepository: IProgressRepository = new ProgressRepository(
    ProgressModel
  );
  const userRepository: IUsersRepository = new UserRepository(UserModel);
  const stripe = new Stripe(env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-02-24.acacia",
  });

  const useCase: ICreatePaymentIntentUseCase = new CreatePaymentIntentUseCase(
    repository,
    userRepository,
    progressRepository,
    stripe
  );
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new CreatePaymentIntentController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
