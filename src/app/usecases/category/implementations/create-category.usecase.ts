import {
  ICreateCategoryRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";
import { CategoryEntity } from "../../../../domain/entities";
import {
  AuthenticateUserErrorType,
  CategoryErrorType,
} from "../../../../domain/enums";
import { ICategoryRepository } from "../../../repositories";
import { ICreateCategoryUseCase } from "../interfaces";

export class CreateCategoryUseCase implements ICreateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(
    { title, adminId }: ICreateCategoryRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO> {
    try {
      if (adminId !== authData.userId) {
        return {
          data: { error: AuthenticateUserErrorType.UserCanNotDoIt },
          success: false,
        };
      }
      const courseEntity = CategoryEntity.create({
        title,
        isListed: true,
      });

      const createdCategory = await this.categoryRepository.create(
        courseEntity
      );

      if (!createdCategory) {
        return {
          data: { error: CategoryErrorType.CategoryCreationFailed },
          success: false,
        };
      }

      return { data: { category: createdCategory }, success: true };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
