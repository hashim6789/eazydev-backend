import {
  IGetLearningContentRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";

export interface IGetLearningContentsUseCase {
  execute(
    query: IGetLearningContentRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO>;
}
