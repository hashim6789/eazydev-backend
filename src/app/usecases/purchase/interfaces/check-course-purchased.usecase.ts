import { Payload, ResponseDTO } from "../../../../domain/dtos";

export interface ICheckCoursePurchasedUseCase {
  execute(courseId: string, authData: Payload): Promise<ResponseDTO>;
}
