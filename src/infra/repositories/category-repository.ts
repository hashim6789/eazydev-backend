import { Model } from "mongoose";
import { ICategoryRepository } from "../../app/repositories";
import { ICategory } from "../databases/interfaces";
import { ICreateCategoryInDTO, ICategoryOutDTO } from "../../domain/dtos";

export class CategoryRepository implements ICategoryRepository {
  private model: Model<ICategory>;

  constructor(model: Model<ICategory>) {
    this.model = model;
  }

  async create(data: ICreateCategoryInDTO): Promise<ICategoryOutDTO> {
    try {
      const createData = new this.model(data);
      const lesson = await createData.save();

      return {
        id: lesson._id.toString(),
        title: lesson.title,
        isListed: lesson.isListed,
      };
    } catch (error) {
      console.error("Error while creating lesson:", error);
      throw new Error("Lesson creation failed");
    }
  }

  async updateListOfCategory(
    categoryId: string,
    change: boolean
  ): Promise<boolean> {
    try {
      const course = await this.model.findByIdAndUpdate(categoryId, {
        isListed: change,
      });

      return course ? true : false;
    } catch (error) {
      console.error("Error while update status of course:", error);
      throw new Error("Course status update failed");
    }
  }
}
