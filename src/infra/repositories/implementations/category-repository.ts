import { Model } from "mongoose";
import { ICategory } from "../../databases/interfaces";
import { ICategoryOutDTO, QueryCategory } from "../../../domain/dtos";
import { PaginationDTO } from "../../../domain/dtos/pagination.dtos";
import { Role } from "../../../domain/types";
import { ICategoryRepository } from "../interfaces";
import { BaseRepository } from "./base-repository";
import { mapCategoryToDTO } from "../../databases/mappers";

export class CategoryRepository
  extends BaseRepository<ICategory>
  implements ICategoryRepository
{
  constructor(model: Model<ICategory>) {
    super(model);
  }

  async updateListOfCategory(
    categoryId: string,
    change: boolean
  ): Promise<boolean> {
    try {
      const category = await this.model.findByIdAndUpdate(categoryId, {
        isListed: change,
      });

      return category ? true : false;
    } catch (error) {
      console.error("Error while update status of category:", error);
      throw new Error("Course status update failed");
    }
  }

  async findAll({
    status = "all",
    search = "",
    page = "1",
    limit = "5",
    role = "learner",
  }: QueryCategory): Promise<PaginationDTO> {
    try {
      const query = {
        isListed:
          role === "admin"
            ? status !== "all"
              ? status === "listed"
                ? true
                : false
              : { $exists: true }
            : true,
        title: { $regex: search, $options: "i" },
      };
      const categories = await this.model
        .find(query)
        .skip((parseInt(page, 10) - 1) * parseInt(limit, 10))
        .limit(parseInt(limit, 10))
        .sort({ updatedAt: -1 })
        .lean();

      const total = await this.model.countDocuments(query);

      return {
        body: categories.map(mapCategoryToDTO),
        total,
        page: parseInt(page, 10),
        last_page: Math.ceil(total / parseInt(limit)),
      };
    } catch (error) {
      console.error("Error while find all category:", error);
      throw new Error("Category fetch failed");
    }
  }

  async fetch(role: Role): Promise<ICategoryOutDTO[]> {
    try {
      const query = {
        isListed: role === "admin" ? { $exists: true } : true,
      };
      const categories = await this.model.find(query).sort({ updatedAt: -1 });
      return categories.map(mapCategoryToDTO);
    } catch (error) {
      console.error("Error while fetch all category:", error);
      throw new Error("Category fetch failed");
    }
  }

  async findByTitle(title: string): Promise<ICategoryOutDTO | null> {
    try {
      const category = await this.model.findOne({
        title: { $regex: `^${title}$`, $options: "i" }, // Case-insensitive match
      });
      if (!category) return null;
      return mapCategoryToDTO(category);
    } catch (error) {
      console.error("Error while fetching category:", error);
      throw new Error("Category fetch failed");
    }
  }
}
