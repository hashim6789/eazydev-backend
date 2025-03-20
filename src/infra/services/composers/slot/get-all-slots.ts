import { ISlotRepository } from "../../../../app/repositories";
import { IController } from "../../../../presentation/http/controllers";
import { SlotModel } from "../../../databases/models";
import { SlotRepository } from "../../../repositories/slot.repository";
import {
  GetAllSlotUseCase,
  IGetAllSlotUseCase,
} from "../../../../app/usecases/slot";
import { GetAllSlotController } from "../../../../presentation/http/controllers/slot";

export function getAllSlotsComposer(): IController {
  const repository: ISlotRepository = new SlotRepository(SlotModel);
  const useCase: IGetAllSlotUseCase = new GetAllSlotUseCase(repository);
  const controller: IController = new GetAllSlotController(useCase);
  return controller;
}
