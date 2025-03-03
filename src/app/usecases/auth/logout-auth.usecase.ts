import { ILogoutRequestDTO } from "../../../domain/dtos/auth/logut-auth-dto";
import { ResponseDTO } from "../../../domain/dtos/response.dtos";

export interface ILogoutUseCase {
  execute(data: ILogoutRequestDTO): Promise<ResponseDTO>;
}
