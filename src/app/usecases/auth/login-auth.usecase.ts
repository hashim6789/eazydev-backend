import { ILoginRequestDTO } from "../../../domain/dtos/auth/login-auth.dto";
import { ResponseDTO } from "../../../domain/dtos/response.dtos";

export interface ILoginUseCase {
  execute(data: ILoginRequestDTO): Promise<ResponseDTO>;
}
