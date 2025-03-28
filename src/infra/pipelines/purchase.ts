import { PipelineStage } from "mongoose";

export const monthlyRevenuePopulatedPipeline = (): PipelineStage[] => [
  {
    $group: {
      _id: { $dateToString: { format: "%Y-%m", date: "$purchaseDate" } },
      revenue: { $sum: "$amount" },
    },
  },
  {
    $sort: { _id: 1 },
  },
  {
    $project: {
      _id: 0,
      month: "$_id",
      revenue: 1,
    },
  },
];
