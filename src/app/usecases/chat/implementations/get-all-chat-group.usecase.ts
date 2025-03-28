import { ResponseDTO } from "../../../../domain/dtos/response";
import { IGetAllChatGroupUseCase } from "../interfaces";
import { Payload } from "../../../../domain/dtos";
import { IChatGroupRepository } from "../../../repositories";

export class GetAllChatGroupUseCase implements IGetAllChatGroupUseCase {
  constructor(private chatGroupRepository: IChatGroupRepository) {}

  async execute({ userId, role }: Payload): Promise<ResponseDTO> {
    try {
      const groups = await this.chatGroupRepository.findAllByUserAndRole(
        userId,
        role
      );
      return {
        statusCode: 200,
        success: true,
        data: groups,
      };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
