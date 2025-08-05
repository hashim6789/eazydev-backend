import { Document, Model, FilterQuery, Types, isValidObjectId } from "mongoose";
import { IBaseRepository } from "../interfaces";

export abstract class BaseRepository<T extends Document>
  implements IBaseRepository<T>
{
  constructor(protected readonly _model: Model<T>) {}
  async create(data: Partial<T>): Promise<T> {
    const document = new this._model(data);
    const result = await document.save();
    return result;
  }

  async update(
    id: string | Types.ObjectId,
    data: Partial<T>
  ): Promise<T | null> {
    if (!isValidObjectId(id)) throw new Error("Invalid ID format");
    return this._model.findByIdAndUpdate(id, data, { new: true });
  }

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return this._model.findOne(filter);
  }
  async findById(id: string | Types.ObjectId): Promise<T | null> {
    if (!isValidObjectId(id)) throw new Error("Invalid ID format");
    return this._model.findById(id);
  }

  async delete(filter: FilterQuery<T>): Promise<void> {
    const result = await this._model.deleteOne(filter);
    if (result.deletedCount === 0) {
      throw new Error("Document not found or already deleted");
    }
  }
}
