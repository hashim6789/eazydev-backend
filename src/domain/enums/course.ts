/**
 * Enum representing error types related to course operations.
 *
 * @enum
 */
export enum CourseErrorType {
  CourseFetchingFailed = "Course fetching is failed!",
  CourseNotFound = "Course is not found!",
  CourseCreationFailed = "Course creation is failed!",
  CompleteStatusFailed = "Only drafted and rejected courses can be completed!",
  RequestStatusFailed = "Only completed courses can be requested!",
  RejectStatusFailed = "Only requested courses can be rejected!",
  ApproveStatusFailed = "Only requested courses can be approved!",
  PublishStatusFailed = "Only approved courses can be published!",
}
