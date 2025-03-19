export interface INotificationOutDTO {
  id: string;
  title: string;
  message: string;
  recipientId: string;
  createdAt: number;
}

export type ICreateNotificationInDTO = Omit<INotificationOutDTO, "id">;
export type IGetAllNotificationRequestDTO = Pick<
  ICreateNotificationInDTO,
  "recipientId"
>;
