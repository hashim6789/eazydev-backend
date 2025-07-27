import {
  ICategoryOutDTO,
  IUpdateCategoryRequestDTO,
  mapCategoryToDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";
import {
  AuthenticateUserErrorType,
  CategoryErrorType,
} from "../../../../domain/enums";
import { formatErrorResponse } from "../../../../presentation/http/utils";
import { ICategoryRepository } from "../../../../infra/repositories";
import { IUpdateCategoryUseCase } from "../interfaces";

export class UpdateCategoryUseCase implements IUpdateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(
    { categoryId, title, adminId }: IUpdateCategoryRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO> {
    try {
      if (adminId !== authData.userId) {
        return {
          data: { error: AuthenticateUserErrorType.UserCanNotDoIt },
          success: false,
        };
      }

      const duplicateCategory = await this.categoryRepository.findByTitle(
        title
      );
      if (duplicateCategory) {
        return {
          data: { error: CategoryErrorType.CategoryAlreadyExist },
          success: false,
        };
      }

      const category = await this.categoryRepository.findById(categoryId);
      if (!category) {
        return {
          data: { error: CategoryErrorType.CategoryNotFound },
          success: false,
        };
      }

      Object.assign(category, { title });

      const updatedCategory = await this.categoryRepository.update(
        category.id,
        category
      );

      if (!updatedCategory) {
        return {
          data: { error: CategoryErrorType.CategoryUpdateFailed },
          success: false,
        };
      }

      const mappedData: ICategoryOutDTO = mapCategoryToDTO(updatedCategory);

      return { data: { category: mappedData }, success: true };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
