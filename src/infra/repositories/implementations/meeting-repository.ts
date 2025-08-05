import { Model } from "mongoose";
import { IMeeting } from "../../databases/interfaces";
import {
  IMeetingOutDTO,
  IMeetingOutPopulatedDTO,
  Meeting,
} from "../../../domain/dtos";
import { MeetingEntity } from "../../../domain/entities";
import { Role } from "../../../domain/types";
import { IMeetingRepository } from "../interfaces";
import { BaseRepository } from "./base-repository";

export class MeetingRepository
  extends BaseRepository<IMeeting>
  implements IMeetingRepository
{
  constructor(model: Model<IMeeting>) {
    super(model);
  }

  async findAllByUserAndRole(
    userId: string,
    role: Role
  ): Promise<IMeetingOutPopulatedDTO[]> {
    try {
      const query =
        role === "learner" ? { learnerId: userId } : { mentorId: userId };
      const meetings = await this._model
        .find(query)
        .populate("courseId", "title")
        .populate("learnerId", "firstName lastName")
        .populate("mentorId", "firstName lastName")
        .populate("slotId", "time");

      const populatedMeetings: IMeetingOutPopulatedDTO[] = meetings.map(
        (meeting) => {
          const { _id: courseId, title } = meeting.courseId as unknown as {
            _id: string;
            title: string;
          };
          const { time } = meeting.slotId as unknown as { time: number };

          const {
            _id: mentorId,
            firstName: mentorFirstName,
            lastName: mentorLastName,
          } = meeting.mentorId as unknown as {
            firstName: string;
            lastName: string;
            _id: string;
          };
          const {
            _id: learnerId,
            firstName: learnerFirstName,
            lastName: learnerLastName,
          } = meeting.learnerId as unknown as {
            firstName: string;
            lastName: string;
            _id: string;
          };
          return {
            id: meeting.id.toString(),
            course: {
              id: courseId,
              title,
            },
            mentor: {
              id: mentorId,
              firstName: mentorFirstName,
              lastName: mentorLastName,
            },
            learner: {
              id: learnerId,
              firstName: learnerFirstName,
              lastName: learnerLastName,
            },
            roomId: meeting.roomId,
            slot: { time },
          };
        }
      );

      return populatedMeetings;
    } catch (error) {
      console.error("Error while create meeting:", error);
      throw new Error("Meeting create failed");
    }
  }
}
