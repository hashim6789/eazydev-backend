import { model } from "mongoose";
import { IToken } from "../interfaces";
import { refreshTokenSchema } from "../schemas";

// Create the Refresh Token model
export const TokenModel = model<IToken>("RefreshToken", refreshTokenSchema);
