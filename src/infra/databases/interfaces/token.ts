import { ObjectId } from "mongoose";
import { Role, TokenType } from "../../../domain/types";

export interface IToken extends Document {
  _id: ObjectId;
  type: TokenType;
  userId: ObjectId;
  expiresIn: number;
  role: Role;
  createdAt: Date;
}
