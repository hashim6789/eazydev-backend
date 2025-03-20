export interface Meeting {
  courseId: string;
  learnerId: string;
  mentorId: string;
  roomId: string;
  slotId: string;
  mentorPeerId: string | null;
  learnerPeerId: string | null;
}

export type IMeetingOutDTO = Meeting & { id: string };

export interface IMeetingOutPopulatedDTO {
  id: string;
  course: { id: string; title: string };
  learner: { firstName: string; lastName: string; id: string };
  mentor: { firstName: string; lastName: string; id: string };
  roomId: string;
  slot: { time: number };
}
