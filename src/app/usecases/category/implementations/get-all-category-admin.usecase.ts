import { QueryCategory, ResponseDTO } from "../../../../domain/dtos";
import { CategoryErrorType } from "../../../../domain/enums";
import { ICategoryRepository } from "../../../repositories";
import { IGetAllCategoryAdminUseCase } from "../interfaces";

export class GetAllCategoryAdminUseCase implements IGetAllCategoryAdminUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(query: QueryCategory): Promise<ResponseDTO> {
    try {
      const categories = await this.categoryRepository.findAll({
        ...query,
        role: "admin",
      });
      if (categories.total === 0) {
        return {
          success: false,
          data: { error: CategoryErrorType.CategoryNotFound },
        };
      }

      return { success: true, data: categories };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
