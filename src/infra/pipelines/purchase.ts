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

export function adminRevenueAnalysisPipeline(): PipelineStage[] {
  return [
    {
      $match: {
        status: "completed",
      },
    },
    {
      $facet: {
        totalRevenue: [
          {
            $group: {
              _id: null,
              totalRevenue: { $sum: "$amount" },
            },
          },
          {
            $project: {
              _id: 0,
              totalRevenue: 1,
            },
          },
        ],
        monthlyRevenue: [
          {
            $group: {
              _id: {
                month: { $month: "$purchaseDate" },
                year: { $year: "$purchaseDate" },
              },
              revenue: { $sum: "$amount" },
            },
          },
          {
            $project: {
              _id: 0,
              month: {
                $let: {
                  vars: {
                    monthsInString: [
                      "",
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
                  },
                  in: {
                    $arrayElemAt: ["$$monthsInString", "$_id.month"],
                  },
                },
              },
              year: "$_id.year",
              revenue: 1,
            },
          },
          {
            $sort: { year: 1, month: 1 },
          },
        ],
        revenueStreams: [
          {
            $group: {
              _id: null,
              totalPurchase: { $sum: "$amount" },
              totalPlatformFee: {
                $sum: {
                  $multiply: ["$amount", 0.15],
                },
              },
            },
          },
          {
            $project: {
              _id: 0,
              revenueStreams: [
                {
                  type: "purchase",
                  total: "$totalPurchase",
                },
                {
                  type: "platform_fee",
                  total: "$totalPlatformFee",
                },
              ],
            },
          },
          {
            $unwind: "$revenueStreams",
          },
          {
            $replaceRoot: {
              newRoot: "$revenueStreams",
            },
          },
        ],
      },
    },
    {
      $project: {
        totalRevenue: { $arrayElemAt: ["$totalRevenue.totalRevenue", 0] },
        monthlyRevenue: "$monthlyRevenue",
        revenueStreams: "$revenueStreams",
      },
    },
  ];
}
