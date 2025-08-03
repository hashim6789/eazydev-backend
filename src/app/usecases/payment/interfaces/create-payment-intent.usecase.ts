import { Payload, ResponseDTO } from "../../../../domain/dtos";

export interface ICreatePaymentIntentUseCase {
  execute(courseId: string, authData: Payload): Promise<ResponseDTO>;
}
