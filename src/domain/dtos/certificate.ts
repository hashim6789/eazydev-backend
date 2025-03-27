export interface UserBaseDetails {
  id: string;
  firstName: string;
  lastName: string;
}

export interface ICertificateOutDTO {
  id: string;
  progressId: string;
  courseId: string;
  mentorId: string;
  learnerId: string;
  issueDate: number;
}
export interface ICertificateOutPopulateDTO {
  id: string;
  progressId: string;
  course: {
    id: string;
    title: string;
  };
  mentor: UserBaseDetails;
  learner: UserBaseDetails;
  issueDate: number;
}

export interface IGetCertificateRequestDTO {
  progressId: string;
}
