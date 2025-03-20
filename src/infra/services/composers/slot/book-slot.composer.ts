import {
  IMeetingRepository,
  IProgressRepository,
  ISlotRepository,
} from "../../../../app/repositories";
import { IController } from "../../../../presentation/http/controllers";
import { ProgressModel, SlotModel } from "../../../databases/models";
import { SlotRepository } from "../../../repositories/slot.repository";
import {
  BookSlotUseCase,
  GetAllSlotUseCase,
  IBookSlotUseCase,
  IGetAllSlotUseCase,
} from "../../../../app/usecases/slot";
import {
  BookSlotController,
  GetSlotsLearnerController,
} from "../../../../presentation/http/controllers/slot";
import { ProgressRepository } from "../../../repositories";
import { MeetingRepository } from "../../../repositories/meeting-repository";
import { MeetingModel } from "../../../databases/models/meeting.model";

export function bookSlotComposer(): IController {
  const repository: ISlotRepository = new SlotRepository(SlotModel);
  const progressRepository: IProgressRepository = new ProgressRepository(
    ProgressModel
  );
  const meetingRepository: IMeetingRepository = new MeetingRepository(
    MeetingModel
  );
  const useCase: IBookSlotUseCase = new BookSlotUseCase(
    repository,
    progressRepository,
    meetingRepository
  );
  const controller: IController = new BookSlotController(useCase);
  return controller;
}
