export interface IChatGroupOutDTO {
  id: string;
  course: string;
  mentor: string;
  learners: string[];
  createdAt: number;
}

export type ICreateChatGroupInDTO = Omit<IChatGroupOutDTO, "id">;
