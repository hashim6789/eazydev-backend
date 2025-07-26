import { IMeetingRepository } from "../../../repositories";
import { IController } from "../../../../presentation/http/controllers";
import { MeetingRepository } from "../../../repositories/implementations/meeting-repository";
import { MeetingModel } from "../../../databases/models/meeting.model";
import { IJoinMeetingUseCase } from "../../../../app/usecases/meeting/interfaces";
import { JoinMeetingUseCase } from "../../../../app/usecases/meeting/implementations";
import { JoinMeetingController } from "../../../../presentation/http/controllers/meeting";

export function joinMeetingComposer(): IController {
  const repository: IMeetingRepository = new MeetingRepository(MeetingModel);

  const useCase: IJoinMeetingUseCase = new JoinMeetingUseCase(repository);
  const controller: IController = new JoinMeetingController(useCase);
  return controller;
}
