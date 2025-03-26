import mongoose, { PipelineStage } from "mongoose";

export const ProgressPopulatedPipeline = (
  progressId: string
): PipelineStage[] => [
  // Step 1: Match the progress document by `progressId`
  { $match: { _id: new mongoose.Types.ObjectId(progressId) } },

  // Step 2: Populate `userId`, `mentorId`, and `courseId`
  {
    $lookup: {
      from: "users", // Collection name for Users
      localField: "userId",
      foreignField: "_id",
      as: "user",
    },
  },
  { $unwind: "$user" },
  {
    $lookup: {
      from: "users", // Collection name for Mentors
      localField: "mentorId",
      foreignField: "_id",
      as: "mentor",
    },
  },
  { $unwind: "$mentor" },
  {
    $lookup: {
      from: "courses", // Collection name for Courses
      localField: "courseId",
      foreignField: "_id",
      as: "course",
    },
  },
  { $unwind: "$course" },

  // Step 3: Populate `lessons` for the course
  {
    $lookup: {
      from: "lessons", // Collection name for Lessons
      localField: "course.lessons",
      foreignField: "_id",
      as: "lessons",
    },
  },

  // Step 4: Populate `materials` for each lesson
  {
    $lookup: {
      from: "materials", // Collection name for Materials
      localField: "lessons.materials",
      foreignField: "_id",
      as: "materials",
    },
  },

  {
    $addFields: {
      lessons: {
        $map: {
          input: "$lessons",
          as: "lesson",
          in: {
            id: "$$lesson._id",
            title: "$$lesson.title",
            materials: {
              $map: {
                input: {
                  $filter: {
                    input: "$materials",
                    as: "material",
                    cond: {
                      $in: ["$$material._id", "$$lesson.materials"], // Ensure materials are filtered for the lesson
                    },
                  },
                },
                as: "material",
                in: {
                  id: "$$material._id", // Material ID
                  title: "$$material.title", // Material title
                  description: "$$material.description", // Material description
                  type: "$$material.type", // Material type (reading or video)
                  duration: "$$material.duration", // Duration
                  fileKey: "$$material.fileKey", // File key
                  isCompleted: {
                    $in: ["$$material._id", "$completedMaterials"], // Check completion status
                  },
                },
              },
            },
            isCompleted: {
              $in: ["$$lesson._id", "$completedLessons"], // Check lesson completion status
            },
          },
        },
      },
    },
  },
  // Step 6: Select and format the final output
  {
    $project: {
      userId: "$userId",
      mentor: {
        id: "$mentor._id",
        firstName: "$mentor.firstName",
        lastName: "$mentor.lastName",
        profilePicture: "$mentor.profilePicture",
      },
      course: {
        id: "$course._id",
        title: "$course.title",
      },
      completedLessons: 1,
      completedMaterials: 1,
      isCourseCompleted: 1,
      progress: 1,
      completedDate: 1,
      lessons: 1,
    },
  },
];

export const mentorPerformanceAnalyzePipeline = (
  mentorId: string
): PipelineStage[] => [
  {
    $facet: {
      // Completion Rate Data
      completionRateData: [
        {
          $lookup: {
            from: "courses", // Look up the courses collection
            localField: "courseId",
            foreignField: "_id",
            as: "course",
          },
        },
        { $unwind: "$course" }, // Flatten the course data
        {
          $match: {
            "course.mentorId": new mongoose.Types.ObjectId(mentorId),
          },
        }, // Filter by mentorId
        {
          $group: {
            _id: "$courseId",
            course: { $first: "$course.title" },
            completionRate: { $avg: "$progress" }, // Calculate average progress as completion rate
          },
        },
        {
          $project: {
            _id: 0,
            course: 1,
            completionRate: { $round: ["$completionRate", 0] }, // Round to nearest integer
          },
        },
      ],

      // Revenue Data
      revenueData: [
        { $match: { type: "purchase" } }, // Only purchase transactions
        {
          $lookup: {
            from: "courses", // Look up the courses collection
            localField: "receiverId",
            foreignField: "mentorId",
            as: "course",
          },
        },
        { $unwind: "$course" },
        {
          $match: {
            "course.mentorId": new mongoose.Types.ObjectId(mentorId),
          },
        }, // Filter by mentorId
        {
          $group: {
            _id: "$course._id",
            name: { $first: "$course.title" },
            value: { $sum: "$amount" }, // Sum the revenue amounts
          },
        },
        {
          $project: {
            _id: 0,
            name: 1,
            value: 1,
          },
        },
      ],

      // Enrollment Data
      enrollmentData: [
        {
          $lookup: {
            from: "courses", // Look up the courses collection
            localField: "courseId",
            foreignField: "_id",
            as: "course",
          },
        },
        { $unwind: "$course" },
        {
          $match: {
            "course.mentorId": new mongoose.Types.ObjectId(mentorId),
          },
        }, // Filter by mentorId
        {
          $group: {
            _id: { month: { $month: "$createdAt" } },
            enrollments: { $sum: 1 }, // Count the enrollments
          },
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
                { $subtract: ["$_id.month", 1] },
              ],
            }, // Convert month number to month name
            enrollments: 1,
          },
        },
      ],
    },
  },
];
