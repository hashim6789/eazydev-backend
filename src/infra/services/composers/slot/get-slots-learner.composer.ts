import { ISlotRepository } from "../../../../app/repositories";
import { IController } from "../../../../presentation/http/controllers";
import { SlotModel } from "../../../databases/models";
import { SlotRepository } from "../../../repositories/slot.repository";
import {
  GetAllSlotUseCase,
  IGetAllSlotUseCase,
} from "../../../../app/usecases/slot";
import { GetSlotsLearnerController } from "../../../../presentation/http/controllers/slot";

export function getSlotsForLearnerComposer(): IController {
  const repository: ISlotRepository = new SlotRepository(SlotModel);
  const useCase: IGetAllSlotUseCase = new GetAllSlotUseCase(repository);
  const controller: IController = new GetSlotsLearnerController(useCase);
  return controller;
}
