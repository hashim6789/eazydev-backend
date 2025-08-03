/**
 * Interface representing the structure of a category.
 *
 * @interface
 */
export interface CategoryInterface {
  title: string;
  isListed: boolean;
}

/**
 * Class representing a category.
 *
 * @class
 */
export class CategoryEntity {
  private _title: string;
  private _isListed: boolean;

  /**
   * Creates a new category instance.
   *
   * @static
   * @param {CategoryInterface} data - The data to create a category.
   * @returns {CategoryEntity} The created category instance.
   */
  static create(data: CategoryInterface): CategoryEntity {
    return new CategoryEntity(data);
  }

  toObject(): CategoryInterface {
    return {
      title: this._title,
      isListed: this._isListed,
    };
  }

  /**
   * Updates the category instance with the provided data.
   *
   * @param {Partial<CategoryInterface>} updatedData - The data to update the category.
   */
  update(updatedData: Partial<CategoryInterface>): void {
    Object.assign(this, updatedData);
  }

  /**
   * Gets the category's title.
   * @readonly
   */
  get title(): string {
    return this._title;
  }

  /**
   * Gets the category's isListed.
   * @readonly
   */
  get isListed(): boolean {
    return this._isListed;
  }

  /**
   * Creates an instance of CategoryEntity.
   *
   * @constructor
   * @param {CategoryInterface} props - The properties of the category.
   */
  constructor(props: CategoryInterface) {
    this._title = props.title;
    this._isListed = props.isListed;
  }
}
