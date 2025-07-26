import { ResponseDTO } from "../../../../domain/dtos";

export interface ICreatePaymentIntentUseCase {
  execute(courseId: string): Promise<ResponseDTO>;
}
