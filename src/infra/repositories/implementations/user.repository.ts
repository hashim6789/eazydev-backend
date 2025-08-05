import { PaginationDTO } from "../../../domain/dtos";
import {
  ICreateUserRequestDTO,
  IUpdateUserRequestDTO,
  IUserOutRequestDTO,
  IUserValidDTO,
  QueryUser,
  UserDataDTO,
} from "../../../domain/dtos/user";
import { SignupRole, UserStatusData } from "../../../domain/types";

import { IUser } from "../../databases/interfaces";
import { Model } from "mongoose";
import {
  getLearnerAggregationPipeline,
  getMentorAggregationPipeline,
  userStatusesAnalysisPipeline,
} from "../../pipelines";
import { IUsersRepository } from "../interfaces";

export class UserRepository implements IUsersRepository {
  private _model: Model<IUser>;

  constructor(model: Model<IUser>) {
    this._model = model;
  }

  async create({
    email,
    firstName,
    lastName,
    role,
    password,
  }: ICreateUserRequestDTO): Promise<IUserOutRequestDTO> {
    const user = new this._model({
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

  async findByEmail(email: string): Promise<IUserValidDTO | null> {
    const user = await this._model.findOne({ email }).lean();
    if (user) {
      return {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        profilePicture: user.profilePicture,
        password: user.password,
        isBlocked: user.isBlocked,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
        googleId: user.googleId,
      };
    }
    return null;
  }

  async findById(id: string): Promise<IUserValidDTO | null> {
    const user = await this._model.findById(id).lean();
    if (user) {
      return {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        password: user.password,
        profilePicture: user.profilePicture,
        isBlocked: user.isBlocked,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
        googleId: user.googleId,
      };
    }
    return null;
  }

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
    const users = await this._model
      .find(
        query
        // { email: 1, name: 1, createdAt: 1 }
      )
      .skip((parseInt(page, 10) - 1) * parseInt(limit, 10))
      .limit(parseInt(limit, 10))
      .sort({ name: 1 })
      .lean();

    const total = await this._model.countDocuments(query);

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

  async update(
    userId: string,
    data: IUpdateUserRequestDTO
  ): Promise<IUserOutRequestDTO | null> {
    const userUpdated = await this._model
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

  async delete(id: string): Promise<void> {
    await this._model.findByIdAndDelete(id);
  }

  async getUsersAnalysis(): Promise<{
    learnerData: UserStatusData[];
    mentorData: UserStatusData[];
  }> {
    const learnerData = (await this._model.aggregate(
      userStatusesAnalysisPipeline("learner")
    )) as unknown as UserStatusData[];
    const mentorData = (await this._model.aggregate(
      userStatusesAnalysisPipeline("mentor")
    )) as unknown as UserStatusData[];

    return { learnerData, mentorData };
  }

  async getUserData(id: string, role: SignupRole): Promise<UserDataDTO> {
    let result: UserDataDTO[] = [];

    if (role === "mentor") {
      result = await this._model.aggregate(getMentorAggregationPipeline(id));
    } else if (role === "learner") {
      result = await this._model.aggregate(getLearnerAggregationPipeline(id));
    }

    return result[0] as UserDataDTO;
  }
}
