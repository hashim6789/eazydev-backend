import { Model } from "mongoose";
import { ICategoryRepository } from "../../app/repositories";
import { ICategory } from "../databases/interfaces";
import {
  ICreateCategoryInDTO,
  ICategoryOutDTO,
  IUpdateCategoryIntDTO,
  QueryCategory,
} from "../../domain/dtos";
import { PaginationDTO } from "../../domain/dtos/pagination.dtos";
import { Role } from "../../domain/types";

export class CategoryRepository implements ICategoryRepository {
  private model: Model<ICategory>;

  constructor(model: Model<ICategory>) {
    this.model = model;
  }

  async create(data: ICreateCategoryInDTO): Promise<ICategoryOutDTO> {
    try {
      const createData = new this.model({
        title: data.title,
        isListed: data.isListed,
      });
      const category = await createData.save();

      return {
        id: category._id.toString(),
        title: category.title,
        isListed: category.isListed,
      };
    } catch (error) {
      console.error("Error while creating category:", error);
      throw new Error("Lesson creation failed");
    }
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

  async findById(id: string): Promise<ICategoryOutDTO | null> {
    try {
      const category = await this.model.findById(id);
      if (!category) return null;
      return {
        id: category._id.toString(),
        title: category.title,
        isListed: category.isListed,
      };
    } catch (error) {
      console.error("Error while find the category:", error);
      throw new Error("Course fetch failed");
    }
  }

  async update(
    id: string,
    data: Partial<IUpdateCategoryIntDTO>
  ): Promise<ICategoryOutDTO | null> {
    try {
      const category = await this.model.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (!category) return null;
      return {
        id: category._id.toString(),
        title: category.title,
        isListed: category.isListed,
      };
    } catch (error) {
      console.error("Error while find the category:", error);
      throw new Error("Course fetch failed");
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
        .find(
          query
          // { email: 1, name: 1, createdAt: 1 }
        )
        .skip((parseInt(page, 10) - 1) * parseInt(limit, 10))
        .limit(parseInt(limit, 10))
        .sort({ name: 1 })
        .lean();

      const total = await this.model.countDocuments(query);

      return {
        body: categories.map((category) => ({
          id: category._id.toString(),
          isListed: category.isListed,
          title: category.title,
        })),
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
      const categories = await this.model.find(query);
      return categories.map((category) => ({
        id: category._id.toString(),
        isListed: category.isListed,
        title: category.title,
      }));
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
      return {
        id: category._id.toString(),
        isListed: category.isListed,
        title: category.title,
      };
    } catch (error) {
      console.error("Error while fetching category:", error);
      throw new Error("Category fetch failed");
    }
  }
}
