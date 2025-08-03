import { ICategoryOutDTO, QueryCategory } from "../../../domain/dtos";
import { PaginationDTO } from "../../../domain/dtos";
import { Role } from "../../../domain/types";
import { ICategory } from "../../databases/interfaces";
import { IBaseRepository } from "./base.repository";

export interface ICategoryRepository extends IBaseRepository<ICategory> {
  updateListOfCategory(categoryId: string, change: boolean): Promise<boolean>;
  findAll(query?: QueryCategory): Promise<PaginationDTO>;
  fetch(role: Role): Promise<ICategoryOutDTO[]>;
  findByTitle(title: string): Promise<ICategoryOutDTO | null>;
}
