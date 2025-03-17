import {
  ICreateMaterialRequestDTO,
  IMaterialOutDTO,
  IMaterialPopulateMentorDTO,
  IUpdateMaterialDTO,
  QueryMaterial,
} from "../../domain/dtos/material/material";
import MaterialModel from "../databases/models/material.model";
import { IMaterialRepository } from "../../app/repositories/material.repository";
import { PaginationDTO } from "../../domain/dtos/pagination.dtos";
import { IUserDetailsDTO } from "../../domain/dtos/user/user.dto";

class MaterialRepository implements IMaterialRepository {
  /**
   * Creates a new material in the database.
   * @param data The data for the new material.
   * @returns The created material.
   */
  async create({
    title,
    description,
    mentorId,
    type,
    duration,
    fileKey,
  }: ICreateMaterialRequestDTO): Promise<IMaterialOutDTO> {
    const material = new MaterialModel({
      title,
      description,
      mentorId,
      type,
      duration,
      fileKey,
    });

    await material.save();

    return {
      id: material._id.toString(),
      title: material.title,
      mentorId: material.mentorId.toString(),
      description: material.description,
      type: material.type,
      duration: material.duration,
      fileKey: material.fileKey,
    };
  }

  /**
   * Finds a material by its ID.
   * @param id The ID of the material to find.
   * @returns The found material or null if not found.
   */
  async findById(id: string): Promise<IMaterialPopulateMentorDTO | null> {
    const material = await MaterialModel.findById(id)
      .populate("mentorId")
      .exec();
    if (!material) return null;

    const { firstName, lastName, profilePicture } =
      material.mentorId as unknown as IUserDetailsDTO;

    // Check if the material exists and format its output
    return material
      ? {
          id: material._id.toString(),
          title: material.title,
          mentor: {
            firstName,
            lastName,
            profilePicture,
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

    const materials = await MaterialModel.find(query)
      .skip((parseInt(page, 10) - 1) * parseInt(limit, 10))
      .limit(parseInt(limit, 10))
      .sort({ title: 1 })
      .exec();

    const total = await MaterialModel.countDocuments(query);

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

  /**
   * Updates an existing material by its ID.
   * @param materialId The ID of the material to update.
   * @param data The data to update the material with.
   * @returns The updated material or null if not found.
   */
  async update(
    materialId: string,
    data: IUpdateMaterialDTO
  ): Promise<IMaterialOutDTO | null> {
    const materialUpdated = await MaterialModel.findByIdAndUpdate(
      materialId,
      { $set: data },
      { new: true } // Return the updated document
    ).lean(); // Use lean() for a plain JavaScript object instead of a mongoose document

    if (!materialUpdated) {
      return null;
    }

    return {
      id: materialUpdated._id.toString(),
      title: materialUpdated.title,
      mentorId: materialUpdated.mentorId.toString(),
      description: materialUpdated.description,
      type: materialUpdated.type,
      duration: materialUpdated.duration,
      fileKey: materialUpdated.fileKey,
    };
  }

  /**
   * Deletes a material by its ID.
   * @param id The ID of the material to delete.
   * @returns A promise that resolves when the deletion is complete.
   */
  async delete(id: string): Promise<void> {
    await MaterialModel.findByIdAndDelete(id).exec();
  }
}

export default MaterialRepository;
