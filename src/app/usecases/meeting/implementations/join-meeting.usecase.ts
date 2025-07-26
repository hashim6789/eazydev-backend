import {
  IJoinMeetingRequestDTO,
  IMeetingOutDTO,
} from "../../../../domain/dtos";
import { Payload } from "../../../../domain/dtos/jwt-payload";
import { ResponseDTO } from "../../../../domain/dtos/response";
import { MeetingErrorType } from "../../../../domain/enums/meeting";
import {
  IMeetingRepository,
  ISlotRepository,
} from "../../../../infra/repositories";
import { IGetAllMeetingUseCase, IJoinMeetingUseCase } from "../interfaces";
import { formatErrorResponse } from "../../../../presentation/http/utils";

export class JoinMeetingUseCase implements IJoinMeetingUseCase {
  constructor(private meetingRepository: IMeetingRepository) {}

  async execute(
    { peerId, meetingId }: IJoinMeetingRequestDTO,
    { role, userId }: Payload
  ): Promise<ResponseDTO> {
    try {
      const meeting = await this.meetingRepository.findById(meetingId);
      if (!meeting) {
        return {
          data: { error: MeetingErrorType.MeetingNotFound },
          success: false,
        };
      }

      //   if ( meeting.slot.time < new Date().getHours()) {
      //     return {
      //       statusCode: 400,
      //       success: false,
      //       message: "The time is not reached!",
      //     };
      //   }
      // Determine if the user is a mentor or learner
      let otherPeerId = null;
      let meet: IMeetingOutDTO | null = null;
      if (role === "mentor") {
        meet = await this.meetingRepository.updateById(meetingId, {
          mentorPeerId: peerId,
        });
        otherPeerId = meet ? meet.learnerPeerId : null;
      } else {
        meet = await this.meetingRepository.updateById(meetingId, {
          learnerPeerId: peerId,
        });
        otherPeerId = meet ? meet.mentorPeerId : null;
      }

      return { data: { otherPeerId }, success: true };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
