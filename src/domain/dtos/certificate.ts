export interface UserBaseDetails {
  id: string;
  firstName: string;
  lastName: string;
}

export interface ICertificateOutDTO {
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

export interface ICreateCertificateRequestDTO {
  progressId: string;
  learnerId: string;
}
