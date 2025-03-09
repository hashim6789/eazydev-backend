// import { ResponseDTO } from "../../../../domain/dtos/response.dtos";
// import { ICreateUserRequestDTO } from "../../../../domain/dtos/user/create-user.dtos";
// import { UserEntity } from "../../../../domain/entities/user.entity";
// import { UserErrorType } from "../../../../domain/enums/user/error-type.enum";

// import { IPasswordHasher } from "../../../providers/password-hasher.provider";
// import { IUsersRepository } from "../../../repositories/user.repository";
// import { ICreateUserUseCase } from "../create-user.usecase";

// export class CreateUserUseCase implements ICreateUserUseCase {
//   constructor(
//     private userRepository: IUsersRepository,
//     private passwordHasher: IPasswordHasher
//   ) {}

//   async execute({
//     email,
//     firstName,
//     lastName,
//     role,
//     password,
//   }: ICreateUserRequestDTO): Promise<ResponseDTO> {
//     try {
//       const userEntity = UserEntity.create({
//         email,
//         firstName,
//         lastName,
//         role,
//         password,
//       });

//       const userAlreadyExists = await this.userRepository.findByEmail(
//         userEntity.email.address
//       );

//       if (userAlreadyExists) {
//         return {
//           data: { error: UserErrorType.UserAlreadyExists },
//           success: false,
//         };
//       }

//       const passwordHashed = await this.passwordHasher.hashPassword(password);
//       const user = await this.userRepository.create({
//         email: userEntity.email.address,
//         firstName: userEntity.firstName,
//         lastName: userEntity.lastName,
//         role: userEntity.role,
//         password: passwordHashed,
//       });

//       return { data: user, success: true };
//     } catch (error: any) {
//       return { data: { error: error.message }, success: false };
//     }
//   }
// }
