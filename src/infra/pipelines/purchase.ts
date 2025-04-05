import mongoose, { PipelineStage } from "mongoose";

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

export function mentorRevenuePipeline(mentorId: string): PipelineStage[] {
  return [
    {
      $match: {
        status: "completed",
      },
    },
    {
      $lookup: {
        from: "courses",
        localField: "courseId",
        foreignField: "_id",
        as: "course",
      },
    },
    {
      $unwind: "$course",
    },
    {
      $match: {
        "course.mentorId": new mongoose.Types.ObjectId(mentorId),
      },
    },
    {
      $addFields: {
        earning: { $multiply: ["$amount", 0.85] },
      },
    },
    {
      $facet: {
        totalEarnings: [
          {
            $group: {
              _id: null,
              totalEarnings: { $sum: "$earning" },
            },
          },
          {
            $project: { _id: 0, totalEarnings: 1 },
          },
        ],
        currentMonthEarnings: [
          {
            $match: {
              purchaseDate: {
                $gte: new Date(
                  new Date().getFullYear(),
                  new Date().getMonth(),
                  1
                ),
              },
            },
          },
          {
            $group: {
              _id: null,
              currentMonthEarnings: { $sum: "$earning" },
            },
          },
          {
            $project: { _id: 0, currentMonthEarnings: 1 },
          },
        ],
        totalStudents: [
          {
            $group: {
              _id: "$learnerId",
            },
          },
          {
            $count: "totalStudents",
          },
        ],
        monthlyEarnings: [
          {
            $group: {
              _id: {
                month: { $month: "$purchaseDate" },
                year: { $year: "$purchaseDate" },
              },
              earnings: { $sum: "$earning" },
            },
          },
          {
            $project: {
              _id: 0,
              month: {
                $let: {
                  vars: {
                    months: [
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
                    $arrayElemAt: ["$$months", "$_id.month"],
                  },
                },
              },
              year: "$_id.year",
              earnings: 1,
            },
          },
          { $sort: { year: 1, month: 1 } },
        ],
      },
    },
    {
      $project: {
        totalEarnings: {
          $ifNull: [{ $arrayElemAt: ["$totalEarnings.totalEarnings", 0] }, 0],
        },
        currentMonthEarnings: {
          $ifNull: [
            { $arrayElemAt: ["$currentMonthEarnings.currentMonthEarnings", 0] },
            0,
          ],
        },
        totalStudents: {
          $ifNull: [{ $arrayElemAt: ["$totalStudents.totalStudents", 0] }, 0],
        },
        monthlyEarnings: "$monthlyEarnings",
      },
    },
  ];
}
