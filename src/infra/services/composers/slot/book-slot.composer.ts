import {
  IMeetingRepository,
  IProgressRepository,
  ISlotRepository,
} from "../../../repositories";
import { IController } from "../../../../presentation/http/controllers";
import { ProgressModel, SlotModel } from "../../../databases/models";
import { SlotRepository } from "../../../repositories/implementations/slot.repository";
import {
  BookSlotUseCase,
  IBookSlotUseCase,
} from "../../../../app/usecases/slot";
import { BookSlotController } from "../../../../presentation/http/controllers/slot";
import { ProgressRepository } from "../../../repositories/implementations";
import { MeetingRepository } from "../../../repositories/implementations/meeting-repository";
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
