import {
  IMaterialPopulateMentorDTO,
  QueryMaterial,
} from "../../../domain/dtos/material";
import { PaginationDTO } from "../../../domain/dtos";
import { IMaterial } from "../../databases/interfaces";
import { Model } from "mongoose";
import { IMaterialRepository } from "../interfaces";
import { BaseRepository } from "./base-repository";

export class MaterialRepository
  extends BaseRepository<IMaterial>
  implements IMaterialRepository
{
  constructor(model: Model<IMaterial>) {
    super(model);
  }

  async findByIdPopulate(
    id: string
  ): Promise<IMaterialPopulateMentorDTO | null> {
    const material = await this._model.findById(id).populate("mentorId").exec();
    if (!material) return null;

    const {
      firstName,
      lastName,
      profilePicture,
      _id: mentorId,
    } = material.mentorId as unknown as {
      firstName: string;
      lastName: string;
      profilePicture: string;
      _id: string;
    };

    return material
      ? {
          id: material._id.toString(),
          title: material.title,
          mentor: {
            firstName,
            lastName,
            profilePicture,
            id: mentorId.toString(),
          },
          description: material.description,
          type: material.type,
          duration: material.duration,
          fileKey: material.fileKey,
        }
      : null;
  }

  async findAll({
    type = "all",
    search = "",
    page = "1",
    limit = "",
    mentorId,
  }: QueryMaterial): Promise<PaginationDTO> {
    const query = {
      type: type !== "all" ? type : { $exists: true },
      title: { $regex: search, $options: "i" },
      mentorId: mentorId ? mentorId : { $exists: true },
    };

    const materials = await this._model
      .find(query)
      .skip((parseInt(page, 10) - 1) * parseInt(limit, 10))
      .limit(parseInt(limit, 10))
      .sort({ title: 1 })
      .exec();

    const total = await this._model.countDocuments(query);

    return {
      body: materials.map((material) => ({
        id: material._id.toString(),
        type: material.type,
        fileKey: material.fileKey,
        title: material.title,
        mentorId: material.mentorId.toString(),
        description: material.description,
        duration: material.duration,
      })),
      total,
      page: parseInt(page, 10),
      last_page: Math.ceil(total / parseInt(limit)),
    };
  }
}

export default MaterialRepository;
