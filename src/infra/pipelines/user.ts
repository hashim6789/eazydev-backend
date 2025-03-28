import mongoose, { PipelineStage } from "mongoose";
import { SignupRole } from "../../domain/types";
// export const userStatusesAnalysisPipeline = (): PipelineStage[] =>
//   [
//   {
//     $facet: {
//       learnerData: [
//         {
//           $match: {
//             role: "learner",
//           },
//         },
//         {
//           $group: {
//             _id: { isBlocked: "$isBlocked" },
//             count: { $sum: 1 },
//           },
//         },
//         {
//           $project: {
//             _id: 0,
//             status: {
//               $cond: {
//                 if: { $eq: ["$_id.isBlocked", true] },
//                 then: "blocked",
//                 else: "unblocked",
//               },
//             },
//             count: 1, // Include the count in the output
//           },
//         },
//       ],
//       mentorData: [
//         {
//           $match: {
//             role: "mentor",
//           },
//         },
//         {
//           $group: {
//             _id: { isBlocked: "$isBlocked" },
//             count: { $sum: 1 },
//           },
//         },
//         {
//           $project: {
//             _id: 0,
//             status: {
//               $cond: {
//                 if: { $eq: ["$_id.isBlocked", true] },
//                 then: "blocked",
//                 else: "unblocked",
//               },
//             },
//             count: 1, // Include the count in the output
//           },
//         },
//       ],
//     },
//   },
// ];
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
