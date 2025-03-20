import {
  IProgressOutDTO,
  PopulatedProgressLearningsDTO,
  QueryProgress,
} from "../../domain/dtos";
import { PaginationDTO } from "../../domain/dtos/pagination.dtos";
import { ProgressEntity } from "../../domain/entities/progress";

export interface IProgressRepository {
  create(data: ProgressEntity): Promise<IProgressOutDTO>;
  findAllByUserId(query: QueryProgress, userId: string): Promise<PaginationDTO>;
  findByIdPopulate(id: string): Promise<PopulatedProgressLearningsDTO>;
  findById(id: string): Promise<IProgressOutDTO | null>;
  updateProgress(
    id: string,
    materialId: string
  ): Promise<IProgressOutDTO | null>;
}
