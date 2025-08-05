import { ResponseDTO } from "../../../../domain/dtos/response";
import { UserEntity } from "../../../../domain/entities/user";
import { UserErrorType } from "../../../../domain/enums/user";
import {
  IUsersRepository,
  IOtpRepository,
} from "../../../../infra/repositories";

import { ISignupRequestDTO, IUserInRequestDTO } from "../../../../domain/dtos";
import { formatErrorResponse } from "../../../../presentation/http/utils";
import {
  IGenerateOtpProvider,
  IGenerateTokenProvider,
  IPasswordHasher,
  ISendMailProvider,
} from "../../../../infra/providers";
import { mapOtpToDocument } from "../../../../infra/databases/mappers";
import dayjs from "dayjs";

export interface ISignupUseCase {
  execute(data: ISignupRequestDTO): Promise<ResponseDTO>;
}

export class SignupUseCase implements ISignupUseCase {
  constructor(
    private _userRepository: IUsersRepository,
    private _passwordHasher: IPasswordHasher,
    private _generateTokenProvider: IGenerateTokenProvider,
    private _otpRepository: IOtpRepository,
    private _generateOtpProvider: IGenerateOtpProvider,
    private _sendMailProvider: ISendMailProvider
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
        googleId: "",
        profilePicture: "",
      });

      const userAlreadyExists = (await this._userRepository.findByEmail(
        userEntity.email.address
      )) as IUserInRequestDTO | null;

      if (userAlreadyExists && userAlreadyExists.role !== role) {
        return {
          data: { error: UserErrorType.UserInvalidRole },
          success: false,
        };
      }
      if (userAlreadyExists && userAlreadyExists.isVerified) {
        return {
          data: { error: UserErrorType.UserAlreadyExists },
          success: false,
        };
      }

      if (userAlreadyExists && !userAlreadyExists.isVerified) {
        await this._userRepository.delete(userAlreadyExists.id);
      }

      const passwordHashed = await this._passwordHasher.hash(password);
      const user = await this._userRepository.create({
        email: userEntity.email.address,
        firstName: userEntity.firstName,
        lastName: userEntity.lastName,
        role: userEntity.role,
        password: passwordHashed,
        googleId: userEntity.googleId,
        profilePicture: userEntity.profilePicture,
      });

      const otp = await this._generateOtpProvider.generateOtp();
      const expiresIn = dayjs().add(5, "minute").unix();

      //console.log("otp =", otp);

      const hashedOtp = await this._passwordHasher.hash(otp);

      const mappedDocument = mapOtpToDocument({
        otp: hashedOtp,
        userId: user.id,
        expiresIn,
      });

      const otpDoc = await this._otpRepository.create(mappedDocument);
      await this._sendMailProvider.sendOtpMail(user.email, otp);

      const accessToken = await this._generateTokenProvider.generateToken(
        user.id,
        {
          userId: user.id,
          role: user.role,
        },
        "access"
      );
      const refreshToken = await this._generateTokenProvider.generateToken(
        user.id,
        {
          userId: user.id,
          role: user.role,
        },
        "refresh"
      );

      const outUser = UserEntity.convert(user);

      return {
        data: { refreshToken, accessToken, user: outUser },
        success: true,
      };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
