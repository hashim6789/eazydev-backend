import {
  ICategoryRepository,
  ICertificateRepository,
  IProgressRepository,
} from "../../../../app/repositories";
import {
  CreateCategoryUseCase,
  ICreateCategoryUseCase,
} from "../../../../app/usecases/category";
import {
  CreateCertificateUseCase,
  ICreateCertificateUseCase,
} from "../../../../app/usecases/certificate";
import {
  CreateCategoryController,
  IController,
} from "../../../../presentation/http/controllers";
import { CreateCertificateController } from "../../../../presentation/http/controllers/certificate";

import {
  CategoryModel,
  CertificateModel,
  ProgressModel,
} from "../../../databases/models";
import { CategoryRepository, ProgressRepository } from "../../../repositories";
import { CertificateRepository } from "../../../repositories/certificate.repository";

export function createCertificateComposer(): IController {
  const repository: ICertificateRepository = new CertificateRepository(
    CertificateModel
  );

  const progressRepository: IProgressRepository = new ProgressRepository(
    ProgressModel
  );
  const useCase: ICreateCertificateUseCase = new CreateCertificateUseCase(
    repository,
    progressRepository
  );
  const controller: IController = new CreateCertificateController(useCase);
  return controller;
}
