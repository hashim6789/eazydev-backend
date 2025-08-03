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
  // private model: Model<IMeeting>;

  constructor(model: Model<IMeeting>) {
    // this.model = model;
    super(model);
  }

  // async create(data: MeetingEntity): Promise<IMeetingOutDTO> {
  //   try {
  //     const createData = new this.model({
  //       courseId: data.courseId,
  //       learnerId: data.learnerId,
  //       mentorId: data.mentorId,
  //       roomId: data.roomId,
  //       slotId: data.slotId,
  //       mentorPeerId: data.mentorPeerId,
  //       learnerPeerId: data.learnerPeerId,
  //     });
  //     const slot = await createData.save();

  //     return {
  //       id: slot._id.toString(),
  //       mentorId: slot.mentorId.toString(),
  //       courseId: slot.courseId.toString(),
  //       learnerId: slot.learnerId.toString(),
  //       slotId: slot.slotId.toString(),
  //       roomId: slot.roomId,
  //       mentorPeerId: null,
  //       learnerPeerId: null,
  //     };
  //   } catch (error) {
  //     console.error("Error while create meeting:", error);
  //     throw new Error("Meeting create failed");
  //   }
  // }

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

  // async findById(id: string): Promise<IMeetingOutDTO | null> {
  //   try {
  //     const meeting = await this.model.findById(id);
  //     if (!meeting) return null;
  //     return {
  //       id: meeting._id.toString(),
  //       mentorId: meeting.mentorId.toString(),
  //       courseId: meeting.courseId.toString(),
  //       learnerId: meeting.learnerId.toString(),
  //       slotId: meeting.slotId.toString(),
  //       roomId: meeting.roomId,
  //       mentorPeerId: meeting.mentorPeerId,
  //       learnerPeerId: meeting.learnerPeerId,
  //     };
  //   } catch (error) {
  //     console.error("Error while fetch meeting:", error);
  //     throw new Error("Meeting fetch failed");
  //   }
  // }

  // async updateById(
  //   id: string,
  //   data: Partial<Meeting>
  // ): Promise<IMeetingOutDTO | null> {
  //   try {
  //     const meeting = await this.model.findByIdAndUpdate(id, data, {
  //       new: true,
  //     });
  //     if (!meeting) return null;
  //     return {
  //       id: meeting._id.toString(),
  //       mentorId: meeting.mentorId.toString(),
  //       courseId: meeting.courseId.toString(),
  //       learnerId: meeting.learnerId.toString(),
  //       slotId: meeting.slotId.toString(),
  //       roomId: meeting.roomId,
  //       mentorPeerId: meeting.mentorPeerId,
  //       learnerPeerId: meeting.learnerPeerId,
  //     };
  //   } catch (error) {
  //     console.error("Error while update meeting:", error);
  //     throw new Error("Meeting update failed");
  //   }
  // }
}
