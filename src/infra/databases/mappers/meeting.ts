import { Types } from "mongoose";
import { MeetingEntity } from "../../../domain/entities";
import { IMeeting } from "../interfaces";
import { IMeetingOutDTO } from "../../../domain/dtos";

export const mapMeetingToDocument = (
  entity: MeetingEntity
): Partial<IMeeting> => {
  return {
    mentorId: new Types.ObjectId(entity.mentorId),
    learnerId: new Types.ObjectId(entity.learnerId),
    courseId: new Types.ObjectId(entity.courseId),
    slotId: new Types.ObjectId(entity.slotId),
    roomId: entity.roomId,
    mentorPeerId: entity.mentorPeerId,
    learnerPeerId: entity.learnerPeerId,
  };
};

export function mapMeetingToDTO(material: IMeeting): IMeetingOutDTO {
  return {
    id: material._id.toString(),
    learnerId: material.learnerId.toString(),
    mentorId: material.mentorId.toString(),
    courseId: material.courseId.toString(),
    slotId: material.slotId.toString(),
    roomId: material.roomId,
    mentorPeerId: material.mentorPeerId,
    learnerPeerId: material.learnerPeerId,
  };
}
