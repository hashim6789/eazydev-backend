import { ICategoryOutDTO } from "../../../domain/dtos";
import { ICategory } from "../interfaces";

export function mapCategoryToDTO(category: ICategory): ICategoryOutDTO {
  return {
    id: category._id.toString(),
    title: category.title,
    isListed: category.isListed,
  };
}
