import { model } from "mongoose";
import { IUser } from "../interfaces";
import { userSchema } from "../schemas";

export const UserModel = model<IUser>("Users", userSchema);
