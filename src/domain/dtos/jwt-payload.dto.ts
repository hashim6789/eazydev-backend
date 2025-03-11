export interface Payload {
  role: "admin" | "mentor" | "learner";
  userId: string;
}
