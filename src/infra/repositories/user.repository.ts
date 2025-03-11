import { IUsersRepository } from "../../app/repositories/user.repository";
import { PaginationDTO } from "../../domain/dtos/pagination.dtos";

import { ObjectId } from "mongoose";
import { IUser, User } from "../databases/models/user.model";
import { ICreateUserRequestDTO } from "../../domain/dtos/user/create-user.dtos";
import {
  IUpdateUserRequestDTO,
  IUserDetailOutDTO,
  IUserInRequestDTO,
  IUserOutRequestDTO,
  IUserValidDTO,
} from "../../domain/dtos/user/user.dto";
import { QueryUser } from "../../domain/dtos/user";

export class UserRepository implements IUsersRepository {
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
    const user: IUser = new User({
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
    const user = await User.findOne({ email }).lean();
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
  async findById(id: string): Promise<IUserDetailOutDTO | null> {
    const user = await User.findById(id).lean();
    if (user) {
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
    const users = await User.find(
      query
      // { email: 1, name: 1, createdAt: 1 }
    )
      .skip((parseInt(page, 10) - 1) * parseInt(limit, 10))
      .limit(parseInt(limit, 10))
      .sort({ name: 1 })
      .lean();

    const total = await User.countDocuments(query);

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
    const userUpdated: IUser | null = await User.findByIdAndUpdate(
      userId,
      { $set: data },
      { new: true }
    ).lean();
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
    await User.findByIdAndDelete(id);
  }
}
