import { QueryCategory, ResponseDTO } from "../../../../domain/dtos";

export interface IGetAllCategoryAdminUseCase {
  execute(query: QueryCategory): Promise<ResponseDTO>;
}
