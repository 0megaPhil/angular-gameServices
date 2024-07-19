import {Component} from '@angular/core';
import {CharacterService} from "./character.service";
import {Character} from "./character";
import {FormBuilder, FormGroup} from "@angular/forms";

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
  _characterFormGroup: FormGroup = new FormGroup({});
  _formBuilder: FormBuilder;
  protected readonly Character = Character;

  constructor(service: CharacterService, formBuilder: FormBuilder) {
    this._service = service;
    this._formBuilder = formBuilder;
    this._service.batchGet().subscribe(chars => this._characters = chars)
    console.log('CharacterService Provided', service);
  }

  ngOnInit(): void {
    this._characterFormGroup = this.createItem();
  }

  createItem(): FormGroup {
    return this._formBuilder.group({
      name: '',
      character: '',
      description: '',
      gender: '',
      age: '',
      height: '',
      weight: '',
    });
  }

  getService(): CharacterService {
    return this._service;
  }

  create(formGroup: FormGroup): void {
    console.log(formGroup)
    this._service.create(formGroup).subscribe(ch => console.log("Created Character", ch));
  }

  batchGet(): Character[] {
    return this._characters;
  }
}
