import { IMeetingRepository } from "../../../repositories";
import { IController } from "../../../../presentation/http/controllers";
import { MeetingRepository } from "../../../repositories/implementations/meeting-repository";
import { MeetingModel } from "../../../databases/models/meeting.model";
import { IJoinMeetingUseCase } from "../../../../app/usecases/meeting/interfaces";
import { JoinMeetingUseCase } from "../../../../app/usecases/meeting/implementations";
import { JoinMeetingController } from "../../../../presentation/http/controllers/meeting";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function joinMeetingComposer(): IController {
  const repository: IMeetingRepository = new MeetingRepository(MeetingModel);

  const useCase: IJoinMeetingUseCase = new JoinMeetingUseCase(repository);
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new JoinMeetingController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
