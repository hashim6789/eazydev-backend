import {
  IGetSignedUrlRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";

export interface IGetSignedUrlUseCase {
  execute(
    query: IGetSignedUrlRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO>;
}
