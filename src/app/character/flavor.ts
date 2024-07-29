export class Flavor {
  constructor(uuid: string, flavor: string, object_type: string) {
    this._targetId = uuid;
    this._text = flavor;
    this._object_type = object_type;
  }

  private _targetId: string;

  get targetId(): string {
    return this._targetId;
  }

  set targetId(value: string) {
    this._targetId = value;
  }

  private _text: string;

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  private _object_type: string;

  get object_type(): string {
    return this._object_type;
  }

  set object_type(value: string) {
    this._object_type = value;
  }

}
