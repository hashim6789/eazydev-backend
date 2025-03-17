import { Role, SignupRole } from "../types/user";
import { ICreateUserRequestDTO } from "../dtos/user/create-user.dtos";
import {
  IUpdateUserRequestDTO,
  IUserOut,
  IUserOutRequestDTO,
} from "../dtos/user/user.dto";
import { Email } from "../valueObjects/email.values";

/**
 * Interface representing the structure of a user.
 *
 * @interface
 */
export interface UserInterface {
  firstName: string;
  lastName: string;
  email: Email;
  role: SignupRole;
  password: string;
  googleId: string;
  profilePicture: string;
}

/**
 * Class representing a user.
 *
 * @class
 */
export class UserEntity {
  private _firstName: string;
  private _lastName: string;
  private _email: Email;
  private _role: SignupRole;
  private _password: string;
  private _googleId: string;
  private _profilePicture: string;

  /**
   * Creates a new user instance based on the provided data.
   *
   * @static
   * @param {ICreateUserRequestDTO} data - The data to create a user.
   * @returns {UserEntity} The created user instance.
   */
  static create({
    email,
    firstName,
    lastName,
    role,
    password,
    googleId,
    profilePicture,
  }: ICreateUserRequestDTO): UserEntity {
    const newEmail = new Email({ address: email });
    return new UserEntity({
      firstName,
      lastName,
      email: newEmail,
      role,
      password,
      googleId,
      profilePicture,
    });
  }
  static convert({
    id,
    email,
    firstName,
    lastName,
    role,
    profilePicture,
    isBlocked,
    isVerified,
  }: IUserOutRequestDTO): IUserOut {
    return {
      id,
      firstName,
      lastName,
      email,
      role,
      profilePicture,
      isBlocked,
      isVerified,
    };
  }

  /**
   * Updates the user instance with the provided data.
   *
   * @static
   * @param {IUpdateUserRequestDTO} updatedUser - The data to update the user.
   * @returns {IUpdateUserRequestDTO} The updated user data.
   */
  static update(updatedUser: IUpdateUserRequestDTO): IUpdateUserRequestDTO {
    if (updatedUser.email) {
      updatedUser.email = new Email({ address: updatedUser.email }).address;
    }
    return updatedUser;
  }

  /**
   * Gets the user's name.
   *
   * @readonly
   */
  get firstName(): string {
    return this._firstName;
  }
  /**
   * Gets the user's name.
   *
   * @readonly
   */
  get lastName(): string {
    return this._lastName;
  }

  /**
   * Gets the user's email.
   *
   * @readonly
   */
  get email(): Email {
    return this._email;
  }

  /**
   * Gets the user's role.
   *
   * @readonly
   */
  get role(): SignupRole {
    return this._role;
  }

  /**
   * Gets the user's password.
   *
   * @readonly
   */
  get password(): string {
    return this._password;
  }

  /**
   * Gets the user's password.
   *
   * @readonly
   */
  get googleId(): string {
    return this._googleId;
  }
  /**
   * Gets the user's password.
   *
   * @readonly
   */
  get profilePicture(): string {
    return this._profilePicture;
  }

  /**
   * Creates an instance of UserEntity.
   *
   * @constructor
   * @param {UserInterface} props - The properties of the user.
   */
  constructor(props: UserInterface) {
    this._firstName = props.firstName;
    this._lastName = props.lastName;
    this._password = props.password;
    this._role = props.role;
    this._email = props.email;
    this._googleId = props.googleId;
    this._profilePicture = props.profilePicture;
  }
}
