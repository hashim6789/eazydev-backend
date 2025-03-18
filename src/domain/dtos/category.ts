export interface ICategoryOutDTO {
  id: string;
  title: string;
  isListed: boolean;
}

export type ICreateCategoryInDTO = Omit<ICategoryOutDTO, "id">;
export type IUpdateCategoryIntDTO = Omit<ICategoryOutDTO, "id" | "isListed">;

export type ICreateCategoryRequestDTO = Omit<
  ICategoryOutDTO,
  "isListed" | "id"
> & {
  adminId: string;
};

export type IUpdateListCategoryRequestDTO = {
  categoryId: string;
  change: boolean;
  adminId: string;
};

export type IUpdateCategoryRequestDTO = {
  categoryId: string;
  title: string;
  adminId: string;
};
