export interface IChatMessageOutDTO {
  id: string;
  group: string;
  sender: string;
  message: string;
  createdAt: number;
}

export type ICreateChatMessageRequestDTO = {
  groupId: string;
  message: string;
};

export type Sender = {
  id: string;
  name: string;
  profilePicture: string;
};

export interface IChatMessagePopulatedDTO {
  id: string;
  sender: Sender;
  message: string;
  createdAt: number;
}
