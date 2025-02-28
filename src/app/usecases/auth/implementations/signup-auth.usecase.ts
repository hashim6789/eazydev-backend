import { ResponseDTO } from "../../../../domain/dtos/response.dtos";
import { ISignupRequestDTO } from "../../../../domain/dtos/auth";
import { IUsersRepository } from "../../../repositories/user.repository";
import { IPasswordHasher } from "../../../providers/password-hasher.provider";
import { UserEntity } from "../../../../domain/entities/user.entity";
import { UserErrorType } from "../../../../domain/enums/user/error-type.enum";
import { IRefreshTokenRepository } from "../../../repositories/refresh-token.repository";
import { IGenerateRefreshTokenProvider } from "../../../providers/generate-refresh-token.provider";

export interface ISignupUseCase {
  execute(data: ISignupRequestDTO): Promise<ResponseDTO>;
}

export class SignupUseCase implements ISignupUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private passwordHasher: IPasswordHasher,
    private refreshTokenRepository: IRefreshTokenRepository,
    private generateRefreshTokenProvider: IGenerateRefreshTokenProvider
  ) {}

  async execute({
    firstName,
    lastName,
    email,
    role,
    password,
  }: ISignupRequestDTO): Promise<ResponseDTO> {
    try {
      const userEntity = UserEntity.create({
        email,
        firstName,
        lastName,
        role,
        password,
      });

      const userAlreadyExists = await this.userRepository.findByEmail(
        userEntity.email.address
      );

      if (userAlreadyExists) {
        return {
          data: { error: UserErrorType.UserAlreadyExists },
          success: false,
        };
      }

      const passwordHashed = await this.passwordHasher.hashPassword(password);
      const user = await this.userRepository.create({
        email: userEntity.email.address,
        firstName: userEntity.firstName,
        lastName: userEntity.lastName,
        role: userEntity.role,
        password: passwordHashed,
      });

      const token = await this.generateRefreshTokenProvider.generateToken(
        user.id
      );

      const newRefreshToken = await this.refreshTokenRepository.create(
        user.id,
        user.role
      );

      return { data: { refreshToken: newRefreshToken, token }, success: true };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
