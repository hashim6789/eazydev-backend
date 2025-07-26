import { IMeetingRepository } from "../../../repositories";
import { IController } from "../../../../presentation/http/controllers";
import { MeetingRepository } from "../../../repositories/implementations/meeting-repository";
import { MeetingModel } from "../../../databases/models/meeting.model";
import {
  IGetAllMeetingUseCase,
  IJoinMeetingUseCase,
} from "../../../../app/usecases/meeting/interfaces";
import {
  GetAllMeetingUseCase,
  JoinMeetingUseCase,
} from "../../../../app/usecases/meeting/implementations";
import { GetAllMeetingController } from "../../../../presentation/http/controllers/meeting/get-all-meeting.controller";
import { JoinMeetingController } from "../../../../presentation/http/controllers/meeting";

export function joinMeetingComposer(): IController {
  const repository: IMeetingRepository = new MeetingRepository(MeetingModel);

  const useCase: IJoinMeetingUseCase = new JoinMeetingUseCase(repository);
  const controller: IController = new JoinMeetingController(useCase);
  return controller;
}
