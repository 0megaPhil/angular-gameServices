export class Stat {
  constructor(key: string, value: any, description: String) {
    this._key = key;
    this._description = description;
    this._value = Number.parseInt(value);
  }

  private _description: String;

  get description(): String {
    return this._description;
  }

  set description(value: String) {
    this._description = value;
  }

  private _key: string;

  get key(): string {
    return this._key;
  }

  set key(value: string) {
    this._key = value;
  }

  private _value: Number;

  get value(): String {
    return this._value.toString();
  }

  set value(value: any) {
    this._value = Number.parseInt(value);
  }

}
