import { Model } from "mongoose";
import { ISlotRepository } from "../../app/repositories";
import { ISlot } from "../databases/interfaces";
import { ISlotOutDTO, ISlotOutPopulatedDTO } from "../../domain/dtos";
import { SlotEntity } from "../../domain/entities";

export class SlotRepository implements ISlotRepository {
  private model: Model<ISlot>;

  constructor(model: Model<ISlot>) {
    this.model = model;
  }

  async create(data: SlotEntity): Promise<ISlotOutDTO> {
    try {
      const createData = new this.model({
        mentorId: data.mentorId,
        time: data.time,
        isBooked: data.isBooked,
      });
      const slot = await createData.save();

      return {
        id: slot._id.toString(),
        mentorId: slot.mentorId.toString(),
        time: slot.time,
        isBooked: slot.isBooked,
      };
    } catch (error) {
      console.error("Error while creating slot:", error);
      throw new Error("Purchase creation failed");
    }
  }

  async findAllByMentorId(mentorId: string): Promise<ISlotOutPopulatedDTO[]> {
    try {
      const slots = await this.model
        .find({ mentorId })
        .populate("mentorId", "firstName lastName");

      return slots.map((slot) => {
        const {
          _id: mentorId,
          firstName,
          lastName,
        } = slot.mentorId as unknown as {
          _id: string;
          firstName: string;
          lastName: string;
        };
        return {
          id: slot.id.toString(),
          mentor: {
            id: mentorId,
            firstName,
            lastName,
          },
          time: slot.time,
          isBooked: slot.isBooked,
        };
      });
    } catch (error) {
      console.error("Error while fetch slot:", error);
      throw new Error("Purchase fetch failed");
    }
  }

  async findById(id: string): Promise<ISlotOutDTO | null> {
    try {
      const slot = await this.model.findById(id);
      if (!slot) return null;

      return {
        id: slot._id.toString(),
        mentorId: slot.mentorId.toString(),
        time: slot.time,
        isBooked: slot.isBooked,
      };
    } catch (error) {
      console.error("Error while fetch slot:", error);
      throw new Error("Purchase fetch failed");
    }
  }

  async bookById(id: string): Promise<boolean> {
    try {
      const slot = await this.model.findByIdAndUpdate(id, { isBooked: true });
      return slot ? true : false;
    } catch (error) {
      console.error("Error while book slot:", error);
      throw new Error("Slot book failed");
    }
  }
}
