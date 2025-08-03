import { IGoogleLoginRequestDTO } from "../../../../domain/dtos";
import { ResponseDTO } from "../../../../domain/dtos/response";

export interface IGoogleLoginUseCase {
  execute(data: IGoogleLoginRequestDTO): Promise<ResponseDTO>;
}
