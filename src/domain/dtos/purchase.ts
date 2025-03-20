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
export interface IPurchaseOutPopulatedDTO {
  id: string;
  purchaseId: string;
  learnerId: string;
  course: {
    id: string;
    title: string;
  };
  purchaseDate: number;
  paymentIntentId: string;
  amount: number;
  status: string;
}

export type ICreatePurchaseInDTO = Omit<IPurchaseOutDTO, "id">;
export type ICreatePurchaseRequestDTO = {
  learnerId: string;
  amount: number;
  paymentIntentId: string;
  courseId: string;
};
export type IGetPurchaseRequestDTO = { id: string };
export type IGetAllPurchaseRequestDTO = Pick<ICreatePurchaseInDTO, "learnerId">;
