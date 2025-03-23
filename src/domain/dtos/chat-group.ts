export interface IChatGroupOutDTO {
  id: string;
  course: string;
  mentor: string;
  learners: string[];
  createdAt: number;
}

export type ICreateChatGroupInDTO = Omit<IChatGroupOutDTO, "id">;
export type IGetAllChatMessagesRequestDTO = { groupId: string };

interface User {
  id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

export interface IChatGroupOutPopulatedDTO {
  id: string;
  title: string;
  thumbnail: string;
  memberCount: number;
  mentor: User | null;
  learners: User[];
}
