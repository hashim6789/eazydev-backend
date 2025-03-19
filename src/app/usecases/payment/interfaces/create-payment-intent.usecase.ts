import { ResponseDTO } from "../../../../domain/dtos";

export interface ICreatePaymentIntentUseCase {
  execute(
    // amount: number,
    // currency: string,
    courseId: string
  ): Promise<ResponseDTO>;
}
