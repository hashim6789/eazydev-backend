import {
  ICreateUserRequestDTO,
  IUpdateUserRequestDTO,
  IUserOut,
  IUserOutRequestDTO,
} from "../dtos";
import { SignupRole } from "../types/user";

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
  private __firstName: string;
  private __lastName: string;
  private __email: Email;
  private __role: SignupRole;
  private __password: string;
  private __googleId: string;
  private __profilePicture: string;

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
    return this.__firstName;
  }
  /**
   * Gets the user's name.
   *
   * @readonly
   */
  get lastName(): string {
    return this.__lastName;
  }

  /**
   * Gets the user's email.
   *
   * @readonly
   */
  get email(): Email {
    return this.__email;
  }

  /**
   * Gets the user's role.
   *
   * @readonly
   */
  get role(): SignupRole {
    return this.__role;
  }

  /**
   * Gets the user's password.
   *
   * @readonly
   */
  get password(): string {
    return this.__password;
  }

  /**
   * Gets the user's password.
   *
   * @readonly
   */
  get googleId(): string {
    return this.__googleId;
  }
  /**
   * Gets the user's password.
   *
   * @readonly
   */
  get profilePicture(): string {
    return this.__profilePicture;
  }

  /**
   * Creates an instance of UserEntity.
   *
   * @constructor
   * @param {UserInterface} props - The properties of the user.
   */
  constructor(props: UserInterface) {
    this.__firstName = props.firstName;
    this.__lastName = props.lastName;
    this.__password = props.password;
    this.__role = props.role;
    this.__email = props.email;
    this.__googleId = props.googleId;
    this.__profilePicture = props.profilePicture;
  }
}
