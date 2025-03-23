import { ResponseDTO } from "../../../../domain/dtos";
import { Role } from "../../../../domain/types";
import { ICategoryRepository } from "../../../repositories";
import { IGetAllCategoryUseCase } from "../interfaces";

export class GetAllCategoryUseCase implements IGetAllCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(role: Role): Promise<ResponseDTO> {
    try {
      const categories = await this.categoryRepository.fetch(role);

      return { success: true, data: categories };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
