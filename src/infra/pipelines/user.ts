import mongoose, { PipelineStage } from "mongoose";
import { SignupRole } from "../../domain/types";

export const userStatusesAnalysisPipeline = (
  role: SignupRole
): PipelineStage[] => [
  {
    $match: { role },
  },
  {
    $group: {
      _id: "$isBlocked",
      count: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      status: {
        $cond: {
          if: { $eq: ["$_id", true] },
          then: "blocked",
          else: "unblocked",
        },
      },
      count: 1,
    },
  },
];

export function getMentorAggregationPipeline(userId: string) {
  return [
    { $match: { _id: new mongoose.Types.ObjectId(userId), role: "mentor" } },
    {
      $lookup: {
        from: "courses",
        localField: "_id",
        foreignField: "mentorId",
        as: "courses",
      },
    },
    {
      $project: {
        firstName: 1,
        lastName: 1,
        email: 1,
        profilePicture: 1,
        isBlocked: 1,
        courses: {
          $map: {
            input: "$courses",
            as: "course",
            in: {
              title: "$$course.title",
              thumbnail: "$$course.thumbnail",
              price: "$$course.price",
            },
          },
        },
      },
    },
  ];
}

export function getLearnerAggregationPipeline(userId: string) {
  return [
    { $match: { _id: new mongoose.Types.ObjectId(userId), role: "learner" } },
    {
      $lookup: {
        from: "purchases",
        localField: "_id",
        foreignField: "learnerId",
        as: "purchases",
      },
    },
    {
      $lookup: {
        from: "courses",
        localField: "purchases.courseId",
        foreignField: "_id",
        as: "courses",
      },
    },
    {
      $project: {
        _id: 0,
        firstName: 1,
        lastName: 1,
        email: 1,
        profilePicture: 1,
        isBlocked: 1,
        courses: {
          $map: {
            input: "$courses",
            as: "course",
            in: {
              title: "$$course.title",
              thumbnail: "$$course.thumbnail",
              price: "$$course.price",
            },
          },
        },
      },
    },
  ];
}
