import {
  // ICreateMaterialRequestDTO,
  // IMaterialOutDTO,
  // IUpdateMaterialInDTO,
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
  // private model: Model<IMaterial>;

  constructor(model: Model<IMaterial>) {
    super(model);
    // this.model = model;
  }
  /**
   * Creates a new material in the database.
   * @param data The data for the new material.
   * @returns The created material.
   */
  // async create({
  //   title,
  //   description,
  //   mentorId,
  //   type,
  //   duration,
  //   fileKey,
  // }: ICreateMaterialRequestDTO): Promise<IMaterialOutDTO> {
  //   const material = new this.model({
  //     title,
  //     description,
  //     mentorId,
  //     type,
  //     duration,
  //     fileKey,
  //   });

  //   await material.save();

  //   return {
  //     id: material._id.toString(),
  //     title: material.title,
  //     mentorId: material.mentorId.toString(),
  //     description: material.description,
  //     type: material.type,
  //     duration: material.duration,
  //     fileKey: material.fileKey,
  //   };
  // }

  /**
   * Finds a material by its ID.
   * @param id The ID of the material to find.
   * @returns The found material or null if not found.
   */
  async findByIdPopulate(
    id: string
  ): Promise<IMaterialPopulateMentorDTO | null> {
    const material = await this.model.findById(id).populate("mentorId").exec();
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

    // Check if the material exists and format its output
    return material
      ? {
          id: material._id.toString(),
          title: material.title,
          mentor: {
            firstName,
            lastName,
            profilePicture,
            id: mentorId.toString(),
          }, // Ensure mentorId is returned as a string
          description: material.description,
          type: material.type,
          duration: material.duration,
          fileKey: material.fileKey,
        }
      : null;
  }

  /**
   * Retrieves a paginated list of materials based on query parameters.
   * @param query Query parameters for filtering materials.
   * @returns A paginated list of materials.
   */
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

    const materials = await this.model
      .find(query)
      .skip((parseInt(page, 10) - 1) * parseInt(limit, 10))
      .limit(parseInt(limit, 10))
      .sort({ title: 1 })
      .exec();

    const total = await this.model.countDocuments(query);

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

  // /**
  //  * Updates an existing material by its ID.
  //  * @param materialId The ID of the material to update.
  //  * @param data The data to update the material with.
  //  * @returns The updated material or null if not found.
  //  */
  // async update(
  //   materialId: string,
  //   data: IUpdateMaterialInDTO
  // ): Promise<IMaterialOutDTO | null> {
  //   const materialUpdated = await this.model
  //     .findByIdAndUpdate(
  //       materialId,
  //       { $set: data },
  //       { new: true } // Return the updated document
  //     )
  //     .lean(); // Use lean() for a plain JavaScript object instead of a mongoose document

  //   if (!materialUpdated) {
  //     return null;
  //   }

  //   return {
  //     id: materialUpdated._id.toString(),
  //     title: materialUpdated.title,
  //     mentorId: materialUpdated.mentorId.toString(),
  //     description: materialUpdated.description,
  //     type: materialUpdated.type,
  //     duration: materialUpdated.duration,
  //     fileKey: materialUpdated.fileKey,
  //   };
  // }

  // /**
  //  * Deletes a material by its ID.
  //  * @param id The ID of the material to delete.
  //  * @returns A promise that resolves when the deletion is complete.
  //  */
  // async delete(id: string): Promise<void> {
  //   await this.model.findByIdAndDelete(id).exec();
  // }
}

export default MaterialRepository;
