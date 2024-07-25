import {Component} from '@angular/core';
import {CharacterService} from "./character.service";
import {Character} from "./character";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";

@Component({
  selector: 'app-character',
  providers: [CharacterService],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css'
})
export class CharacterComponent {
  title = 'Character Service';
  readonly _service: CharacterService;
  _characters: Character[] = [];
  _characterFormGroup: FormGroup;
  _formBuilder: FormBuilder;
  protected readonly Character = Character;

  constructor(service: CharacterService, formBuilder: FormBuilder) {
    this._service = service;
    this._formBuilder = formBuilder;
    this._characterFormGroup = this.emptyCharacter()

    this._service.batchGet(1000)
      .subscribe(chars => {
        this._characters = chars.data
        console.log(this._characters)
      })
    console.log('CharacterService Provided', service);
  }

  emptyCharacter(): FormGroup {
    return this._formBuilder.group({
      name: '',
      description: '',
      gender: '',
      age: '',
      height: '',
      weight: '',
    });
  }

  characterForm(): FormGroup {
    return this._formBuilder.group({
      name: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(512),
        Validators.pattern("[A-Za-z ]"),
        this.uniqueValidator()
      ]),
      description: new FormControl("", [
        Validators.required,
        Validators.minLength(0),
        Validators.maxLength(4196),
        Validators.pattern("[A-Za-z ]")
      ]),
      gender: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(128),
        Validators.pattern("[A-Za-z ]")
      ]),
      age: new FormControl("pounds", [
        Validators.pattern("[0-9]"),
        Validators.min(0),
        Validators.max(Number.MAX_SAFE_INTEGER),
      ]),
      height: new FormControl("inches", [
        Validators.pattern("[0-9]"),
        Validators.min(1),
        Validators.max(Number.MAX_SAFE_INTEGER),
      ]),
      weight: new FormControl("pounds", [
        Validators.pattern("[0-9]"),
        Validators.min(1),
        Validators.max(Number.MAX_SAFE_INTEGER),
      ])
    });
  }

  uniqueValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !this._characters.find((x) => x == control.value)
        ? null
        : {
          validateName: {
            valid: false,
          },
        };
    };
  }

  create(formGroup: FormGroup): void {
    console.log(formGroup)
    this._service.create(formGroup)
      .subscribe(ch => console.log("Created Character", ch.data));
  }

  batchGet(): Character[] {
    return this._characters;
  }
}
