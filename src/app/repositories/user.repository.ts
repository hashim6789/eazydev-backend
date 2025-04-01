import { PaginationDTO } from "../../domain/dtos/pagination.dtos";
import {
  ICreateUserRequestDTO,
  QueryUser,
  IUpdateUserRequestDTO,
  IUserDetailOutDTO,
  IUserInRequestDTO,
  IUserOutRequestDTO,
  UserDataDTO,
} from "../../domain/dtos";
import { UserStatusData } from "../../domain/types/analysis";

/**
 * Interface for the repository handling user data.
 *
 * @interface
 */
export interface IUsersRepository {
  /**
   * Creates a new user with the provided data.
   *
   * @async
   * @param {ICreateUserRequestDTO} data - The user data to be created.
   * @returns {Promise<IUserOutRequestDTO>} The created user data.
   */
  create(data: ICreateUserRequestDTO): Promise<IUserOutRequestDTO>;

  /**
   * Finds a user by their email address.
   *
   * @async
   * @param {string} email - The email address of the user.
   * @returns {Promise<IUserInRequestDTO | unknown>} The found user data, or undefined if not found.
   */
  findByEmail(email: string): Promise<IUserInRequestDTO | unknown>;

  /**
   * Finds a user by their ID.
   *
   * @async
   * @param {string} id - The ID of the user.
   * @returns {Promise<IUserInRequestDTO | unknown>} The found user data, or undefined if not found.
   */
  findById(id: string): Promise<IUserDetailOutDTO | unknown>;

  /**
   * Retrieves a paginated list of users.
   *
   * @async
   * @param {number} pageNumber - The page number for pagination.
   * @returns {Promise<PaginationDTO>} The paginated list of users.
   */
  findAll(query: QueryUser): Promise<PaginationDTO>;

  /**
   * Updates the user data with the provided information.
   *
   * @async
   * @param {IUserOutRequestDTO} user - The user to be updated.
   * @param {IUpdateUserRequestDTO} data - The updated user data.
   * @returns {Promise<IUserOutRequestDTO>} The updated user data.
   */
  update(
    // user: IUserOutRequestDTO,
    userId: string,
    data: IUpdateUserRequestDTO
  ): Promise<IUserOutRequestDTO | null>;

  /**
   * Deletes a user by their ID.
   *
   * @async
   * @param {string} id - The ID of the user to be deleted.
   * @returns {Promise<void>} A promise that resolves when the user is deleted.
   */
  delete(id: string): Promise<void>;
  /**
   * Deletes a user by their ID.
   *
   * @async
   * @param {string} id - The ID of the user to be deleted.
   * @returns {Promise<void>} A promise that resolves when the user is deleted.
   */
  getUsersAnalysis(): Promise<{
    learnerData: UserStatusData[];
    mentorData: UserStatusData[];
  }>;

  // getUserData(id: string): Promise<UserDataDTO | null>;
}
