import mongoose, { Model } from "mongoose";
import { IChatGroupRepository } from "../../app/repositories";
import {
  IChatGroupOutDTO,
  IChatGroupOutPopulatedDTO,
  ICreateChatGroupInDTO,
} from "../../domain/dtos/chat-group";
import { IChatGroup } from "../databases/interfaces";
import { Role } from "../../domain/types";

export class ChatGroupRepository implements IChatGroupRepository {
  private model: Model<IChatGroup>;

  constructor(model: Model<IChatGroup>) {
    this.model = model;
  }
  async create(data: ICreateChatGroupInDTO): Promise<IChatGroupOutDTO> {
    try {
      const createData = new this.model({
        course: data.course,
        mentor: data.mentor,
        learners: [],
      });
      const chatGroup = await createData.save();

      return {
        id: chatGroup._id.toString(),
        course: chatGroup.course.toString(),
        mentor: chatGroup.mentor.toString(),
        learners: chatGroup.learners.map((item) => item.toString()),
        createdAt: chatGroup.createdAt.getTime(),
      };
    } catch (error) {
      console.error("Error while creating chatGroup:", error);
      throw new Error("Lesson creation failed");
    }
  }

  async findAllByUserAndRole(
    userId: string,
    role: Role
  ): Promise<IChatGroupOutPopulatedDTO[]> {
    try {
      const roleState =
        role === "learner"
          ? { $match: { learners: new mongoose.Types.ObjectId(userId) } }
          : { $match: { mentor: new mongoose.Types.ObjectId(userId) } };

      const pipeline = [
        roleState,
        {
          $lookup: {
            from: "courses",
            localField: "course",
            foreignField: "_id",
            as: "courseDetails",
          },
        },
        { $unwind: "$courseDetails" },
        {
          $lookup: {
            from: "users", // Assuming 'users' is the collection where learner details are stored
            localField: "learners",
            foreignField: "_id",
            as: "learnerDetails",
          },
        },
        {
          $lookup: {
            from: "users", // Assuming 'users' is the collection where mentor details are stored
            localField: "mentor",
            foreignField: "_id",
            as: "mentorDetails",
          },
        },
        {
          $project: {
            _id: "$_id",
            title: "$courseDetails.title",
            thumbnail: "$courseDetails.thumbnail",
            memberCount: { $size: "$learners" }, // Calculating the number of learners
            learners: {
              $map: {
                input: "$learnerDetails",
                as: "learner",
                in: {
                  _id: "$$learner._id",
                  firstName: "$$learner.firstName",
                  lastName: "$$learner.lastName",
                  profilePicture: "$$learner.profilePicture",
                },
              },
            },
            mentor: {
              $arrayElemAt: [
                {
                  $map: {
                    input: "$mentorDetails",
                    as: "mentor",
                    in: {
                      _id: "$$mentor._id",
                      firstName: "$$mentor.firstName",
                      lastName: "$$mentor.lastName",
                      profilePicture: "$$mentor.profilePicture",
                    },
                  },
                },
                0,
              ],
            },
          },
        },
      ];
      const groups = await this.model.aggregate(pipeline);

      return groups as IChatGroupOutPopulatedDTO[];
    } catch (error) {
      console.error("Error while creating chatGroup:", error);
      throw new Error("Lesson creation failed");
    }
  }

  async addLearnerToChatGroup(
    courseId: string,
    learnerId: string
  ): Promise<boolean> {
    try {
      const result = await this.model.updateOne(
        { course: courseId },
        { $addToSet: { learners: learnerId } }
      );

      return result.modifiedCount > 0;
    } catch (error) {
      console.error("Error while creating chatGroup:", error);
      throw new Error("Lesson creation failed");
    }
  }
}
