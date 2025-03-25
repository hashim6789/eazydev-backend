import mongoose, { PipelineStage } from "mongoose";
import { Role } from "../../domain/types";

export const findAllChatGroupByUserAndRolePipeline = (
  role: Role,
  userId: string
): PipelineStage[] => {
  const roleState =
    role === "learner"
      ? { $match: { learners: new mongoose.Types.ObjectId(userId) } }
      : { $match: { mentor: new mongoose.Types.ObjectId(userId) } };

  return [
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
        _id: 0,
        id: "$_id",
        title: "$courseDetails.title",
        thumbnail: "$courseDetails.thumbnail",
        memberCount: { $size: "$learners" }, // Calculating the number of learners
        learners: {
          $map: {
            input: "$learnerDetails",
            as: "learner",
            in: {
              id: "$$learner._id",
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
                  id: "$$mentor._id",
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
};
