import { Payload, ResponseDTO } from "../../../../domain/dtos";

export interface IGetLessonUseCase {
  execute(lessonId: string, authData: Payload): Promise<ResponseDTO>;
}
