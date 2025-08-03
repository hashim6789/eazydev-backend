export interface IPaymentRepository {
  getCourseDetails(
    courseId: string
  ): Promise<{ id: string; title: string; status: string } | null>;
}
