import { Model } from "mongoose";
import { ICategoryRepository } from "../../app/repositories";
import { ICategory } from "../databases/interfaces";
import {
  ICreateCategoryInDTO,
  ICategoryOutDTO,
  IUpdateCategoryIntDTO,
} from "../../domain/dtos";

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
      const category = await this.model.findByIdAndUpdate(id, data);
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
}
