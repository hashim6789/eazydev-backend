import { IGetResetPageRequestDTO } from "../../../../domain/dtos";
import { ResponseDTO } from "../../../../domain/dtos/response";

export interface IGetResetPageUseCase {
  execute(data: IGetResetPageRequestDTO): Promise<ResponseDTO>;
}
