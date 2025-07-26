import {
  ICreateMaterialInDTO,
  IMaterialOutDTO,
  IMaterialPopulateMentorDTO,
  IUpdateMaterialInDTO,
  QueryMaterial,
} from "../../../domain/dtos/material";
import { PaginationDTO } from "../../../domain/dtos/pagination.dtos";

/**
 * Interface for the repository handling material data.
 *
 * @interface
 */
export interface IMaterialRepository {
  /**
   * Creates a new material with the provided data.
   *
   * @async
   * @param {ICreateMaterialDTO} data - The material data to be created.
   * @returns {Promise<IMaterialOutDTO>} The created material data.
   */
  create(data: ICreateMaterialInDTO): Promise<IMaterialOutDTO>;

  /**
   * Finds a material by its ID.
   *
   * @async
   * @param {string} id - The ID of the material.
   * @returns {Promise<IMaterialDetailOutDTO | null>} The found material data, or undefined if not found.
   */
  findById(id: string): Promise<IMaterialPopulateMentorDTO | null>;

  /**
   * Retrieves a paginated list of materials based on query parameters.
   *
   * @async
   * @param {QueryMaterial} query - The query parameters for filtering materials.
   * @returns {Promise<PaginationDTO>} The paginated list of materials.
   */
  findAll(query: QueryMaterial): Promise<PaginationDTO>;

  /**
   * Updates the material data with the provided information.
   *
   * @async
   * @param {string} materialId - The ID of the material to be updated.
   * @param {IUpdateMaterialDTO} data - The updated material data.
   * @returns {Promise<IMaterialOutDTO | null>} The updated material data.
   */
  update(
    materialId: string,
    data: IUpdateMaterialInDTO
  ): Promise<IMaterialOutDTO | null>;

  /**
   * Deletes a material by its ID.
   *
   * @async
   * @param {string} id - The ID of the material to be deleted.
   * @returns {Promise<void>} A promise that resolves when the material is deleted.
   */
  delete(id: string): Promise<void>;
}
