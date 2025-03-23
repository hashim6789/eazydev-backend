import { ResponseDTO } from "../../../../domain/dtos";
import { Role } from "../../../../domain/types";

export interface IGetAllCategoryUseCase {
  execute(role: Role): Promise<ResponseDTO>;
}
