import { ILoginRequestDTO } from "../../../domain/dtos/auth/login-auth.dto";
import { ResponseDTO } from "../../../domain/dtos/response";

export interface ILoginUseCase {
  execute(data: ILoginRequestDTO): Promise<ResponseDTO>;
}
