import { ResponseDTO } from "../../../../domain/dtos/response";
import { IGetPersonalInfoRequestDTO } from "../../../../domain/dtos";

export interface IGetPersonalInfoUseCase {
  execute({ userId, role }: IGetPersonalInfoRequestDTO): Promise<ResponseDTO>;
}
