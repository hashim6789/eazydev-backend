import mongoose, { PipelineStage } from "mongoose";
export const userStatusesAnalysisPipeline = (): PipelineStage[] => [
  {
    $facet: {
      learnerStatus: [
        {
          $match: {
            role: "learner",
          },
        },
        {
          $group: {
            _id: { isBlocked: "$isBlocked" },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            status: {
              $cond: {
                if: { $eq: ["$_id.isBlocked", true] },
                then: "blocked",
                else: "unblocked",
              },
            },
            count: 1, // Include the count in the output
          },
        },
      ],
      mentorStatuses: [
        {
          $match: {
            role: "mentor",
          },
        },
        {
          $group: {
            _id: { isBlocked: "$isBlocked" },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            status: {
              $cond: {
                if: { $eq: ["$_id.isBlocked", true] },
                then: "blocked",
                else: "unblocked",
              },
            },
            count: 1, // Include the count in the output
          },
        },
      ],
    },
  },
];
