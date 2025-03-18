import {
  ICategoryOutDTO,
  ICreateCategoryInDTO,
  IUpdateCategoryIntDTO,
} from "../../domain/dtos";

export interface ICategoryRepository {
  create(data: ICreateCategoryInDTO): Promise<ICategoryOutDTO>;
  updateListOfCategory(categoryId: string, change: boolean): Promise<boolean>;
  findById(id: string): Promise<ICategoryOutDTO | null>;
  update(
    id: string,
    data: Partial<IUpdateCategoryIntDTO>
  ): Promise<ICategoryOutDTO | null>;
}
