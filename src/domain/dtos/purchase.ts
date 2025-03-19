export interface IPurchaseOutDTO {
  id: string;
  purchaseId: string;
  learnerId: string;
  courseId: string;
  purchaseDate: number;
  paymentIntentId: string;
  amount: number;
  status: string;
}

export type ICreatePurchaseInDTO = Omit<IPurchaseOutDTO, "id">;
export type ICreatePurchaseRequestDTO = {
  purchaseId: string;
  learnerId: string;
  amount: number;
  paymentIntentId: string;
  courseId: string;
};
export type IGetAllPurchaseRequestDTO = Pick<ICreatePurchaseInDTO, "learnerId">;
