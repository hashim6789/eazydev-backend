import { QueryCategory, ResponseDTO } from "../../../../domain/dtos";
import { CategoryErrorType } from "../../../../domain/enums";
import { ICategoryRepository } from "../../../repositories";
import { IGetAllCategoryUseCase } from "../interfaces";

export class GetAllCategoryUseCase implements IGetAllCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(): Promise<ResponseDTO> {
    try {
      const categories = await this.categoryRepository.fetch();

      return { success: true, data: categories };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
