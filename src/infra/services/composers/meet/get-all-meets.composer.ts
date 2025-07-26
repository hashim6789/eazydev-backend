import { IMeetingRepository } from "../../../repositories";
import { IController } from "../../../../presentation/http/controllers";
import { MeetingRepository } from "../../../repositories/implementations/meeting-repository";
import { MeetingModel } from "../../../databases/models/meeting.model";
import { IGetAllMeetingUseCase } from "../../../../app/usecases/meeting/interfaces";
import { GetAllMeetingUseCase } from "../../../../app/usecases/meeting/implementations";
import { GetAllMeetingController } from "../../../../presentation/http/controllers/meeting/get-all-meeting.controller";

export function getAllMeetsComposer(): IController {
  const repository: IMeetingRepository = new MeetingRepository(MeetingModel);

  const useCase: IGetAllMeetingUseCase = new GetAllMeetingUseCase(repository);
  const controller: IController = new GetAllMeetingController(useCase);
  return controller;
}
