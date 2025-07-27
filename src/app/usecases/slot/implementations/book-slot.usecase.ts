import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import { IBookSlotRequestDTO } from "../../../../domain/dtos";
import { Payload } from "../../../../domain/dtos/jwt-payload";
import { ResponseDTO } from "../../../../domain/dtos/response";
import { MeetingEntity } from "../../../../domain/entities/meeting";
import {
  AuthenticateUserErrorType,
  SlotErrorType,
} from "../../../../domain/enums";
import { ProgressErrorType } from "../../../../domain/enums/progress";
import {
  IMeetingRepository,
  IProgressRepository,
  ISlotRepository,
} from "../../../../infra/repositories";
import { IBookSlotUseCase } from "../interfaces";
import { formatErrorResponse } from "../../../../presentation/http/utils";
import { mapMeetingToDocument } from "../../../../infra/databases/mappers/meeting";

export class BookSlotUseCase implements IBookSlotUseCase {
  constructor(
    private slotRepository: ISlotRepository,
    private progressRepository: IProgressRepository,
    private meetingRepository: IMeetingRepository
  ) {}

  async execute(
    { progressId, slotId, learnerId }: IBookSlotRequestDTO,
    { userId }: Payload
  ): Promise<ResponseDTO> {
    try {
      if (learnerId !== userId) {
        return {
          data: { error: AuthenticateUserErrorType.UserCanNotDoIt },
          success: false,
        };
      }

      const progress = await this.progressRepository.findById(progressId);
      if (!progress || progress.userId !== userId) {
        return {
          data: { error: ProgressErrorType.ProgressNotFound },
          success: false,
        };
      }
      const slot = await this.slotRepository.findById(slotId);
      if (!slot || slot.isBooked) {
        return { data: { error: SlotErrorType.SlotNotFound }, success: false };
      }

      const isBooked = await this.slotRepository.bookById(slotId);
      if (!isBooked) {
        return { data: { error: SlotErrorType.SlotNotFound }, success: false };
      }

      const meetingEntity = MeetingEntity.create({
        courseId: progress.courseId,
        learnerId,
        mentorId: progress.mentorId,
        roomId: uuidv4(),
        slotId,
        learnerPeerId: null,
        mentorPeerId: null,
      });

      //created the meeting
      await this.meetingRepository.create(mapMeetingToDocument(meetingEntity));

      return { data: slot, success: true };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
