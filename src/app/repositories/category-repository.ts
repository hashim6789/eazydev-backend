import {
  ICategoryOutDTO,
  ICreateCategoryInDTO,
  IUpdateCategoryIntDTO,
  QueryCategory,
} from "../../domain/dtos";
import { PaginationDTO } from "../../domain/dtos/pagination.dtos";

export interface ICategoryRepository {
  create(data: ICreateCategoryInDTO): Promise<ICategoryOutDTO>;
  updateListOfCategory(categoryId: string, change: boolean): Promise<boolean>;
  findById(id: string): Promise<ICategoryOutDTO | null>;
  update(
    id: string,
    data: Partial<IUpdateCategoryIntDTO>
  ): Promise<ICategoryOutDTO | null>;
  findAll(query?: QueryCategory): Promise<PaginationDTO>;
  fetch(): Promise<ICategoryOutDTO[]>;
}
