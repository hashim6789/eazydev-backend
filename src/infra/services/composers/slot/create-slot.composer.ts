import { ISlotRepository } from "../../../../app/repositories";

import { IController } from "../../../../presentation/http/controllers";
import { SlotModel } from "../../../databases/models";

import { SlotRepository } from "../../../repositories/slot.repository";
import {
  CreateSlotUseCase,
  ICreateSlotUseCase,
} from "../../../../app/usecases/slot";
import { CreateSlotController } from "../../../../presentation/http/controllers/slot";

export function createSlotComposer(): IController {
  const repository: ISlotRepository = new SlotRepository(SlotModel);

  const useCase: ICreateSlotUseCase = new CreateSlotUseCase(repository);
  const controller: IController = new CreateSlotController(useCase);
  return controller;
}
