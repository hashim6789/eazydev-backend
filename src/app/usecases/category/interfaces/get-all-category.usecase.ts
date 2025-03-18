import { QueryCategory, ResponseDTO } from "../../../../domain/dtos";

export interface IGetAllCategoryUseCase {
  execute(): Promise<ResponseDTO>;
}
