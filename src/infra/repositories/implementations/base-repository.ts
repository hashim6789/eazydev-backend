import { Document, Model, FilterQuery, Types, isValidObjectId } from "mongoose";
import { IBaseRepository } from "../interfaces";

export abstract class BaseRepository<T extends Document>
  implements IBaseRepository<T>
{
  constructor(protected readonly model: Model<T>) {}
  async create(data: Partial<T>): Promise<T> {
    console.log("data", data);
    const document = new this.model(data);
    console.log(document);
    const result = await document.save();
    return result;
  }

  async update(
    id: string | Types.ObjectId,
    data: Partial<T>
  ): Promise<T | null> {
    if (!isValidObjectId(id)) throw new Error("Invalid ID format");
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(filter);
  }
  async findById(id: string | Types.ObjectId): Promise<T | null> {
    if (!isValidObjectId(id)) throw new Error("Invalid ID format");
    return this.model.findById(id);
  }
}
