import { ILoginRequestDTO } from "../../../../domain/dtos";
import { ResponseDTO } from "../../../../domain/dtos/response";

export interface ILoginUseCase {
  execute(data: ILoginRequestDTO): Promise<ResponseDTO>;
}
