import { PipelineStage } from "mongoose";

export const monthlyRevenuePopulatedPipeline = (): PipelineStage[] => [
  {
    $group: {
      _id: { $month: "$purchaseDate" }, // Extract the month number (1-12)
      revenue: { $sum: "$amount" },
    },
  },
  {
    $sort: { _id: 1 }, // Sort by month (ascending order)
  },
  {
    $project: {
      _id: 0,
      month: {
        $arrayElemAt: [
          [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          { $subtract: ["$_id", 1] }, // Convert month number (1-12) to array index (0-11)
        ],
      },
      revenue: 1,
    },
  },
];
