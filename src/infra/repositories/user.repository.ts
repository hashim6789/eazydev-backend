import { IUsersRepository } from "../../app/repositories/user.repository";
import { PaginationDTO } from "../../domain/dtos/pagination.dtos";

import { ObjectId } from "mongoose";
import { IUser, User } from "../databases/models/user.model";
import { ICreateUserRequestDTO } from "../../domain/dtos/user/create-user.dtos";
import {
  IUpdateUserRequestDTO,
  IUserInRequestDTO,
  IUserOutRequestDTO,
  IUserValidDTO,
} from "../../domain/dtos/user/user.dto";

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
      createdAt: user.createdAt,
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
  async findById(id: string): Promise<IUserInRequestDTO | null> {
    const user = await User.findById(id).lean();
    if (user) {
      return {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        password: user.password,
        createdAt: user.createdAt,
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
  async findAll(pageNumber: number): Promise<PaginationDTO> {
    const perPage = 4;
    const users = await User.find({}, { email: 1, name: 1, createdAt: 1 })
      .skip((pageNumber - 1) * perPage)
      .limit(perPage)
      .sort({ name: 1 })
      .lean();

    const total = await User.countDocuments();

    return {
      body: users.map((user) => ({
        id: user._id.toString(),
        email: user.email,
        name: user.firstName,
        createdAt: user.createdAt,
      })),
      total,
      page: pageNumber,
      last_page: Math.ceil(total / perPage),
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
    { email, firstName, lastName, password }: IUpdateUserRequestDTO
  ): Promise<IUserOutRequestDTO | null> {
    const updateData: Partial<IUser> = {};
    if (email) updateData.email = email;
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (password) updateData.password = password;

    const userUpdated: IUser | null = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
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
      createdAt: userUpdated.createdAt,
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
