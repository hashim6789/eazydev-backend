import { ICreateMaterialRequestDTO } from "../dtos/material";
import { MaterialType } from "../types";

/**
 * Interface representing the structure of a material.
 *
 * @interface
 */
export interface MaterialInterface {
  title: string;
  mentorId: string;
  description: string;
  type: MaterialType;
  duration: number;
  fileKey: string;
}

/**
 * Class representing a material.
 *
 * @class
 */
export class MaterialEntity {
  private _title: string;
  private _mentorId: string;
  private _description: string;
  private _type: MaterialType;
  private _duration: number;
  private _fileKey: string;

  /**
   * Creates a new material instance based on the provided data.
   *
   * @static
   * @param {ICreateMaterialRequestDTO} data - The data to create a material.
   * @returns {MaterialEntity} The created material instance.
   */
  static create({
    title,
    mentorId,
    description,
    type,
    duration,
    fileKey,
  }: MaterialInterface): MaterialEntity {
    return new MaterialEntity({
      title,
      mentorId,
      description,
      type,
      duration,
      fileKey,
    });
  }

  /**
   * Updates the material instance with the provided data.
   *
   * @static
   * @param {IUpdateMaterialRequestDTO} updatedMaterial - The data to update the material.
   * @returns {IUpdateMaterialRequestDTO} The updated material data.
   */
  static update(updatedData: Partial<MaterialInterface>): void {
    Object.assign(this, updatedData);
  }

  /**
   * Gets the material's name.
   *
   * @readonly
   */
  get title(): string {
    return this._title;
  }
  /**
   * Gets the material's name.
   *
   * @readonly
   */
  get mentorId(): string {
    return this._mentorId;
  }

  /**
   * Gets the material's email.
   *
   * @readonly
   */
  get type(): MaterialType {
    return this._type;
  }

  /**
   * Gets the material's role.
   *
   * @readonly
   */
  get description(): string {
    return this._description;
  }

  /**
   * Gets the material's password.
   *
   * @readonly
   */
  get duration(): number {
    return this._duration;
  }

  /**
   * Gets the material's password.
   *
   * @readonly
   */
  get fileKey(): string {
    return this._fileKey;
  }

  /**
   * Creates an instance of MaterialEntity.
   *
   * @constructor
   * @param {MaterialInterface} props - The properties of the material.
   */
  constructor(props: MaterialInterface) {
    this._title = props.title;
    this._description = props.description;
    this._mentorId = props.mentorId;
    this._fileKey = props.fileKey;
    this._type = props.type;
    this._duration = props.duration;
  }
}
