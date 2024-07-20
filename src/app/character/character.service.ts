import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FormGroup} from "@angular/forms";
import {Character} from "./character";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  apiUrl = 'https://localhost:8081/character';

  constructor(private http: HttpClient) {
  }

  batchGet(): Observable<Character[]> {
    return this.http.get<Character[]>(this.apiUrl);
  }

  get(uuid: string): Observable<Character[]> {
    return this.http.get<Character[]>(this.apiUrl,
      {params: {"uuid": uuid}});
  }

  create(characterFormGroup: FormGroup): Observable<Character> {
    let character: Character;
    character = characterFormGroup.value;
    console.log("Character", character);
    return this.http.post<Character>(this.apiUrl, character)
  }

}
