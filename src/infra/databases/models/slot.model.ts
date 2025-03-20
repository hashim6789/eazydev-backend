import mongoose from "mongoose";
import { ISlot } from "../interfaces";
import { SlotSchema } from "../schemas";

export const SlotModel = mongoose.model<ISlot>("Slots", SlotSchema);
