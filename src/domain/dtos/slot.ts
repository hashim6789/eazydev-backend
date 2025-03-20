export interface Slot {
  id: string;
  mentorId: string;
  time: number;
  isBooked: boolean;
}

export type ICreateSlotRequestDTO = Omit<Slot, "id" | "isBooked">;
export type IGetAllSlotRequestDTO = { mentorId: string };
export type IBookSlotRequestDTO = {
  learnerId: string;
  slotId: string;
  progressId: string;
};

export interface ISlotOutDTO {
  id: string;
  mentorId: string;
  time: number;
  isBooked: boolean;
}
export interface ISlotOutPopulatedDTO {
  id: string;
  mentor: { id: string; firstName: string; lastName: string };
  time: number;
  isBooked: boolean;
}
