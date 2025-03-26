import { model } from "mongoose";
import { IToken } from "../interfaces";
import { tokenSchema } from "../schemas";

// Create the Refresh Token model
export const TokenModel = model<IToken>("token", tokenSchema);
