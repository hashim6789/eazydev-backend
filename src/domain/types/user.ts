export type Role = "admin" | "mentor" | "learner";

export type SignupRole = Exclude<Role, "admin">;
