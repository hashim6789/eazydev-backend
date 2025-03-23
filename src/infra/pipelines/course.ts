import mongoose, { PipelineStage } from "mongoose";

export const mentorRevenueAnalysisPipeline = (
  mentorId: string
): PipelineStage[] => [
  {
    $facet: {
      // Course Status Data
      courseStatusData: [
        {
          $match: {
            mentorId: new mongoose.Types.ObjectId(mentorId),
          },
        },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            status: "$_id",
            count: 1,
          },
        },
      ],

      // Revenue Data
      revenueData: [
        {
          $match: {
            mentorId: new mongoose.Types.ObjectId(mentorId),
          },
        },
        {
          $lookup: {
            from: "purchases",
            localField: "_id",
            foreignField: "courseId",
            as: "purchaseDetails",
          },
        },
        { $unwind: "$purchaseDetails" },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$title" },
            value: { $sum: "$purchaseDetails.amount" },
          },
        },
        {
          $project: {
            _id: 0,
            name: 1,
            value: { $divide: ["$value", 100] },
          },
        },
      ],
    },
  },
];
