import { Role } from "../types";

import { z } from "zod";
import { RoleTypes } from "../enums";
import { ObjectIdSchema } from "./common";

export interface Payload {
  role: Role;
  userId: string;
}

const { ADMIN, MENTOR, LEARNER } = RoleTypes;

export const PayloadSchema = z.object({
  userId: ObjectIdSchema,
  role: z.enum([ADMIN, MENTOR, LEARNER]),
});

// export type Payload = z.infer<typeof PayloadSchema>;
