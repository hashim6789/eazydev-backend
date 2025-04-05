import { ResponseDTO } from "../../../../domain/dtos";

export interface IGetMentorRevenueAnalyzeUseCase {
  execute(mentorId: string): Promise<ResponseDTO>;
}
