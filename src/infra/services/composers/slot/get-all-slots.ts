import { ISlotRepository } from "../../../repositories";
import { IController } from "../../../../presentation/http/controllers";
import { SlotModel } from "../../../databases/models";
import { SlotRepository } from "../../../repositories/implementations/slot.repository";
import {
  GetAllSlotUseCase,
  IGetAllSlotUseCase,
} from "../../../../app/usecases/slot";
import { GetAllSlotController } from "../../../../presentation/http/controllers/slot";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function getAllSlotsComposer(): IController {
  const repository: ISlotRepository = new SlotRepository(SlotModel);
  const useCase: IGetAllSlotUseCase = new GetAllSlotUseCase(repository);
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new GetAllSlotController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
