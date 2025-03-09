// import { IPasswordHasher } from "../../../../app/providers/password-hasher.provider";
// import { IUsersRepository } from "../../../../app/repositories/user.repository";
// import { ICreateUserUseCase } from "../../../../app/usecases/user/create-user.usecase";
// import { CreateUserUseCase } from "../../../../app/usecases/user/implementations/create-user.usecase";
// import { CreateUserController } from "../../../../presentation/http/controllers/user/implementations/create-user.controller";
// import { IController } from "../../../../presentation/http/IController";
// import { PasswordHasher } from "../../../providers/password-hasher.provider";
// import { UserRepository } from "../../../repositories/user.repository";

// export function createUserComposer(): IController {
//   const repository: IUsersRepository = new UserRepository();
//   const passwordHasher: IPasswordHasher = new PasswordHasher();
//   const useCase: ICreateUserUseCase = new CreateUserUseCase(
//     repository,
//     passwordHasher
//   );
//   const controller: IController = new CreateUserController(useCase);
//   return controller;
// }
