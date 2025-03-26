import { model } from "mongoose";
import { IRefreshToken } from "../interfaces";
import { refreshTokenSchema } from "../schemas";

// Create the Refresh Token model
export const RefreshTokenModel = model<IRefreshToken>(
  "RefreshToken",
  refreshTokenSchema
);
