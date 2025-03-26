import { ResponseDTO } from "../../../../domain/dtos/response";
import { IGoogleRequestDTO } from "../../../../domain/dtos/auth/google-auth.dto";

export interface IGoogleLoginUseCase {
  execute(data: IGoogleRequestDTO): Promise<ResponseDTO>;
}
