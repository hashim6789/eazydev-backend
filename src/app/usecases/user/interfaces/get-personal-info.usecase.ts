import { ResponseDTO } from "../../../../domain/dtos/response";
import { IGetPersonalInfoRequestDTO } from "../../../../domain/dtos/user/get-user-request.dto";

export interface IGetPersonalInfoUseCase {
  execute({ userId, role }: IGetPersonalInfoRequestDTO): Promise<ResponseDTO>;
}
