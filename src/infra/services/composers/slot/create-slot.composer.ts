import { ISlotRepository } from "../../../repositories";
import { IController } from "../../../../presentation/http/controllers";
import { SlotModel } from "../../../databases/models";
import { SlotRepository } from "../../../repositories/implementations/slot.repository";
import {
  CreateSlotUseCase,
  ICreateSlotUseCase,
} from "../../../../app/usecases/slot";
import { CreateSlotController } from "../../../../presentation/http/controllers/slot";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function createSlotComposer(): IController {
  const repository: ISlotRepository = new SlotRepository(SlotModel);

  const useCase: ICreateSlotUseCase = new CreateSlotUseCase(repository);
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new CreateSlotController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
