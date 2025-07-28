import { z } from "zod";
import { ObjectId } from "mongodb";
import { CommonErrorMessages } from "../enums";

const { INVALID_OBJECTID } = CommonErrorMessages;

export const ObjectIdSchema = z.string().refine(ObjectId.isValid, {
  message: INVALID_OBJECTID,
});
