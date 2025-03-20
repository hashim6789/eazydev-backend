import { Schema } from "mongoose";
import { IPurchase } from "../interfaces";

export const purchaseSchema = new Schema<IPurchase>({
  purchaseId: {
    type: String,
    required: true,
  },
  learnerId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  paymentIntentId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});
