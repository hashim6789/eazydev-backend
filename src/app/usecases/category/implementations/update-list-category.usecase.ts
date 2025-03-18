import {
  IUpdateListCategoryRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";
import {
  AuthenticateUserErrorType,
  CategoryErrorType,
} from "../../../../domain/enums";
import { ICategoryRepository } from "../../../repositories";
import { IUpdateListCategoryUseCase } from "../interfaces";

export class UpdateListCategoryUseCase implements IUpdateListCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(
    { categoryId, change, adminId }: IUpdateListCategoryRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO> {
    try {
      if (adminId !== authData.userId) {
        return {
          data: { error: AuthenticateUserErrorType.UserCanNotDoIt },
          success: false,
        };
      }

      const isUpdated = await this.categoryRepository.updateListOfCategory(
        categoryId,
        change
      );

      if (!isUpdated) {
        return {
          data: { error: CategoryErrorType.CategoryListUpdateFailed },
          success: false,
        };
      }

      return { data: { success: true }, success: true };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
