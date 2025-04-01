import { IUsersRepository } from "../../app/repositories/user.repository";
import { PaginationDTO } from "../../domain/dtos/pagination.dtos";
import {
  ICreateUserRequestDTO,
  IUpdateUserRequestDTO,
  IUserDetailOutDTO,
  IUserOutRequestDTO,
  IUserValidDTO,
  QueryUser,
  UserDataDTO,
} from "../../domain/dtos/user";
import { UserStatusData } from "../../domain/types";

import { IUser } from "../databases/interfaces";
import { Model } from "mongoose";
import { userStatusesAnalysisPipeline } from "../pipelines";

export class UserRepository implements IUsersRepository {
  private model: Model<IUser>;

  constructor(model: Model<IUser>) {
    this.model = model;
  }
  /**
   * Creates a new user.
   *
   * @async
   * @param {ICreateUserRequestDTO} data - The user data.
   * @returns {Promise<IUserOutRequestDTO>} The created user.
   */
  async create({
    email,
    firstName,
    lastName,
    role,
    password,
  }: ICreateUserRequestDTO): Promise<IUserOutRequestDTO> {
    const user = new this.model({
      email,
      firstName,
      lastName,
      role,
      password,
    });
    await user.save();

    return {
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      profilePicture: user.profilePicture,
      isBlocked: user.isBlocked,
      isVerified: user.isVerified,
    };
  }

  /**
   * Finds a user by email.
   *
   * @async
   * @param {string} email - The email to search for.
   * @returns {Promise<IUserInRequestDTO | null>} The found user or null.
   */
  async findByEmail(email: string): Promise<IUserValidDTO | null> {
    const user = await this.model.findOne({ email }).lean();
    if (user) {
      return {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        password: user.password,
        isBlocked: user.isBlocked,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
        googleId: user.googleId,
      };
    }
    return null;
  }

  /**
   * Finds a user by ID.
   *
   * @async
   * @param {string} id - The ID of the user to find.
   * @returns {Promise<IUserInRequestDTO | null>} The found user or null.
   */
  async findById(id: string): Promise<IUserValidDTO | null> {
    const user = await this.model.findById(id).lean();
    if (user) {
      return {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        password: user.password,
        isBlocked: user.isBlocked,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
        googleId: user.googleId,
      };
    }
    return null;
  }

  /**
   * Retrieves a paginated list of users.
   *
   * @async
   * @param {number} pageNumber - The page number to retrieve.
   * @returns {Promise<PaginationDTO>} The paginated list of users.
   */
  async findAll({
    role = "learner",
    status = "all",
    search = "",
    page = "1",
    limit = "5",
  }: QueryUser): Promise<PaginationDTO> {
    const query = {
      role,
      isBlocked:
        status !== "all"
          ? status === "blocked"
            ? true
            : false
          : { $exists: true },
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
      ],
    };
    const users = await this.model
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
      body: users.map((user) => ({
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isBlocked: user.isBlocked,
        isVerified: user.isVerified,
        profilePicture: user.profilePicture,
      })),
      total,
      page: parseInt(page, 10),
      last_page: Math.ceil(total / parseInt(limit)),
    };
  }

  /**
   * Updates a user with new data.
   *
   * @async
   * @param {IUserOutRequestDTO} user - The user to update.
   * @param {IUpdateUserRequestDTO} data - The updated user data.
   * @returns {Promise<IUserOutRequestDTO>} The updated user.
   */
  async update(
    userId: string,
    data: IUpdateUserRequestDTO
  ): Promise<IUserOutRequestDTO | null> {
    const userUpdated = await this.model
      .findByIdAndUpdate(userId, { $set: data }, { new: true })
      .lean();
    if (!userUpdated) {
      return null;
    }

    return {
      id: userUpdated._id.toString(),
      email: userUpdated.email,
      firstName: userUpdated.firstName,
      lastName: userUpdated.lastName,
      role: userUpdated.role,
      profilePicture: userUpdated.profilePicture,
      isBlocked: userUpdated.isBlocked,
      isVerified: userUpdated.isVerified,
    };
  }

  /**
   * Deletes a user by ID.
   *
   * @async
   * @param {string} id - The ID of the user to delete.
   * @returns {Promise<void>} A Promise that resolves once the user is deleted.
   */
  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }

  async getUsersAnalysis(): Promise<{
    learnerData: UserStatusData[];
    mentorData: UserStatusData[];
  }> {
    const learnerData = (await this.model.aggregate(
      userStatusesAnalysisPipeline("learner")
    )) as unknown as UserStatusData[];
    const mentorData = (await this.model.aggregate(
      userStatusesAnalysisPipeline("mentor")
    )) as unknown as UserStatusData[];

    return { learnerData, mentorData };
  }

  // async getUserData(id: string): Promise<UserDataDTO | null> {

  // }
}
