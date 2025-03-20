import { Model } from "mongoose";
import { IMeetingRepository } from "../../app/repositories";
import { IMeeting } from "../databases/interfaces";
import { IMeetingOutDTO, IMeetingOutPopulatedDTO } from "../../domain/dtos";
import { MeetingEntity } from "../../domain/entities";
import { PaginationDTO } from "../../domain/dtos/pagination.dtos";
import { Role } from "../../domain/types";

export class MeetingRepository implements IMeetingRepository {
  private model: Model<IMeeting>;

  constructor(model: Model<IMeeting>) {
    this.model = model;
  }

  async create(data: MeetingEntity): Promise<IMeetingOutDTO> {
    try {
      const createData = new this.model({
        courseId: data.courseId,
        learnerId: data.learnerId,
        mentorId: data.mentorId,
        roomId: data.roomId,
        slotId: data.slotId,
        mentorPeerId: data.mentorPeerId,
        learnerPeerId: data.learnerPeerId,
      });
      const slot = await createData.save();

      return {
        id: slot._id.toString(),
        mentorId: slot.mentorId.toString(),
        courseId: slot.courseId.toString(),
        learnerId: slot.learnerId.toString(),
        slotId: slot.slotId.toString(),
        roomId: slot.roomId,
        mentorPeerId: null,
        learnerPeerId: null,
      };
    } catch (error) {
      console.error("Error while create meeting:", error);
      throw new Error("Meeting create failed");
    }
  }

  async findAllByUserAndRole(
    userId: string,
    role: Role
  ): Promise<IMeetingOutPopulatedDTO[]> {
    try {
      const query =
        role === "learner" ? { learnerId: userId } : { mentorId: userId };
      const meetings = await this.model
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

      // return {
      //   body: populatedMeetings,
      //   total: 0,
      //   last_page: 0,
      //   page: 0,
      // };
    } catch (error) {
      console.error("Error while create meeting:", error);
      throw new Error("Meeting create failed");
    }
  }
}
