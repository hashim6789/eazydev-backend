import { error } from "console";
import { IUserValidDTO } from "../../../../domain/dtos";
import { ResponseDTO } from "../../../../domain/dtos/response";
import { IPurchaseRepository, IUsersRepository } from "../../../repositories";
import { IGetMentorRevenueAnalyzeUseCase } from "../interfaces";
import { UserErrorType } from "../../../../domain/enums";
import { formatErrorResponse } from "../../../../presentation/http/utils";

export class GetMentorRevenueAnalyzeUseCase
  implements IGetMentorRevenueAnalyzeUseCase
{
  constructor(
    private purchaseRepository: IPurchaseRepository,
    private userRepository: IUsersRepository
  ) {}

  async execute(mentorId: string): Promise<ResponseDTO> {
    try {
      const mentor = (await this.userRepository.findById(
        mentorId
      )) as IUserValidDTO | null;
      if (!mentor || mentor.role !== "mentor") {
        return {
          data: { error: UserErrorType.UserNotFound },
          success: true,
        };
      }
      const monthlyRevenueData =
        await this.purchaseRepository.analyzeMentorRevenue(mentorId);

      return {
        data: monthlyRevenueData,
        success: true,
      };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
