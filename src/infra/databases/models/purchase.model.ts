import { model } from "mongoose";
import { purchaseSchema } from "../schemas";
import { IPurchase } from "../interfaces";

export const PurchaseModel = model<IPurchase>("Purchase", purchaseSchema);
