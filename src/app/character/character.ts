export class Character {
  constructor(uuid: string, name: string, description: string,
              gender: string, age: number, height: number, weight: number) {
    this._uuid = uuid;
    this._name = name;
    this._description = description;
    this._gender = gender;
    this._age = age;
    this._height = height;
    this._weight = weight;
  }

  private _uuid: string;

  get uuid(): string {
    return this._uuid;
  }

  set uuid(value: string) {
    this._uuid = value;
  }

  private _name: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  private _description: string;

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  private _gender: string;

  get gender(): string {
    return this._gender;
  }

  set gender(value: string) {
    this._gender = value;
  }

  private _age: number;

  get age(): number {
    return this._age;
  }

  set age(value: number) {
    this._age = value;
  }

  private _height: number;

  get height(): number {
    return this._height;
  }

  set height(value: number) {
    this._height = value;
  }

  private _weight: number;

  get weight(): number {
    return this._weight;
  }

  set weight(value: number) {
    this._weight = value;
  }
}
