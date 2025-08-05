import { IUserValidDTO } from "../../../../domain/dtos";
import { ResponseDTO } from "../../../../domain/dtos/response";
import {
  IPurchaseRepository,
  IUsersRepository,
} from "../../../../infra/repositories";
import { IGetMentorRevenueAnalyzeUseCase } from "../interfaces";
import { UserErrorType } from "../../../../domain/enums";
import { formatErrorResponse } from "../../../../presentation/http/utils";

export class GetMentorRevenueAnalyzeUseCase
  implements IGetMentorRevenueAnalyzeUseCase
{
  constructor(
    private _purchaseRepository: IPurchaseRepository,
    private _userRepository: IUsersRepository
  ) {}

  async execute(mentorId: string): Promise<ResponseDTO> {
    try {
      const mentor = (await this._userRepository.findById(
        mentorId
      )) as IUserValidDTO | null;
      if (!mentor || mentor.role !== "mentor") {
        return {
          data: { error: UserErrorType.UserNotFound },
          success: true,
        };
      }
      const monthlyRevenueData =
        await this._purchaseRepository.analyzeMentorRevenue(mentorId);

      return {
        data: monthlyRevenueData,
        success: true,
      };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
