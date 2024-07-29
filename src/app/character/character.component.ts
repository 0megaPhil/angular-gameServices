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
import {Flavor} from "./flavor";

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
  _flavored: Map<string, Flavor> = new Map;
  _characterFormGroup: FormGroup;
  _formBuilder: FormBuilder;
  protected readonly Character = Character;

  constructor(service: CharacterService, formBuilder: FormBuilder) {
    this._service = service;
    this._formBuilder = formBuilder;
    this._characterFormGroup = this.emptyCharacter()
    this.flavoredCharacters()
  }

  emptyCharacter(): FormGroup {
    return this._formBuilder.group({
      name: '',
      description: '',
      gender: '',
      age: '',
      height: '',
      weight: '',
      strength: '',
      intelligence: '',
      wisdom: '',
      dexterity: '',
      charisma: '',
      constitution: '',
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
      ]),
      strength: new FormControl("value", [
        Validators.pattern("[0-9]"),
        Validators.min(1),
        Validators.max(22),
      ]),
      intelligence: new FormControl("value", [
        Validators.pattern("[0-9]"),
        Validators.min(1),
        Validators.max(22),
      ]),
      wisdom: new FormControl("value", [
        Validators.pattern("[0-9]"),
        Validators.min(1),
        Validators.max(22),
      ]),
      dexterity: new FormControl("value", [
        Validators.pattern("[0-9]"),
        Validators.min(1),
        Validators.max(22),
      ]),
      charisma: new FormControl("value", [
        Validators.pattern("[0-9]"),
        Validators.min(1),
        Validators.max(22),
      ]),
      constitution: new FormControl("value", [
        Validators.pattern("[0-9]"),
        Validators.min(1),
        Validators.max(22),
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
      .subscribe(ch => {
        console.log("Debug")
        console.log("Created Character", ch.data)
      });
  }

  batchGet(): Character[] {
    return this._characters;
  }

  batchFlavored(): Map<string, Flavor> {
    return this._flavored;
  }

  flavoredCharacters(): void {
    this._service.batchGet(1000).subscribe(obj => {
      this._characters = obj.data['allCharacters'];
      console.log("Characters", this._characters)
      console.log("Length", this._characters.length)
      for (let i = this._characters.length - 1; i >= 0; i--) {
        this._service.flavor(this._characters[i].uuid)
          .subscribe(res => {
            let flavor = res.data['characterFlavor']
            console.log("Flavor", flavor.text)
            this._flavored.set(this._characters[i].name, flavor)
          });
      }
    })
  }
}
