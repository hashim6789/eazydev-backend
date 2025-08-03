/**
 * Enum representing error types related to course operations.
 *
 * @enum
 */
export enum CourseErrorType {
  CourseFetchingFailed = "Course fetching is failed!",
  CourseNotFound = "Course is not found!",
  CourseCreationFailed = "Course creation is failed!",
  CourseUpdateStatusFailed = "Course update status is failed!",
  CompleteStatusFailed = "Only drafted and rejected courses can be completed!",
  RequestStatusFailed = "Only completed courses can be requested!",
  RejectStatusFailed = "Only requested courses can be rejected!",
  ApproveStatusFailed = "Only requested courses can be approved!",
  PublishStatusFailed = "Only approved courses can be published!",
}

export enum CourseSorts {
  PRICE_ASC = "priceAsc",
  PRICE_DEC = "priceDesc",
  TITLE_DEC = "titleAsc",
  TITLE_ASC = "titleDesc",
}
export enum CourseStatuses {
  DRAFT = "draft",
  REQUESTED = "requested",
  PUBLISHED = "published",
  APPROVED = "approved",
  REJECTED = "rejected",
}
