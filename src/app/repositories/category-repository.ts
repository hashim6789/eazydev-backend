import { ICategoryOutDTO, ICreateCategoryInDTO } from "../../domain/dtos";

export interface ICategoryRepository {
  create(data: ICreateCategoryInDTO): Promise<ICategoryOutDTO>;
  updateListOfCategory(categoryId: string, change: boolean): Promise<boolean>;
}
