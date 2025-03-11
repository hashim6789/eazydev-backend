import {
  IRecoveryUserDTO,
  IRefreshTokenUserDTO,
} from "../../../../domain/dtos/refresh";
import { ResponseDTO } from "../../../../domain/dtos/response.dtos";

export interface IRecoverUserInformationUseCase {
  execute(data: IRecoveryUserDTO): Promise<ResponseDTO>;
}
