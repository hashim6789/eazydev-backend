import { ObjectId } from "mongoose";

export interface IPurchase extends Document {
  _id: ObjectId;
  purchaseId: string;
  learnerId: ObjectId;
  courseId: ObjectId;
  purchaseDate: Date;
  paymentIntentId: string;
  amount: number;
  status: string;
}
