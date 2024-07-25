import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FormGroup} from "@angular/forms";
import {Character} from "./character";
import {Apollo, gql} from "apollo-angular";
import {ApolloQueryResult} from "@apollo/client";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  apiUrl = 'https://localhost:8081/character';

  private readonly apollo: Apollo;

  constructor(private http: HttpClient, apollo: Apollo) {
    this.apollo = apollo;
  }

  batchGet(limit: Number): Observable<ApolloQueryResult<Character[]>> {
    return this.apollo.query({
      query: gql`
        query allCharacters($limit: Int) {
          allCharacters(limit: $limit) {
            uuid,
            name,
            description,
            gender,
            height,
            age,
            weight,
            inventoryId
          }
        }`, variables: {limit: limit}
    })
  }

  get(uuid: string): Observable<ApolloQueryResult<Character>> {
    return this.apollo.query({
      query: gql`
        query characterById($uuid: ID) {
          characterById(uuid: $uuid) {
            uuid,
            name,
            description,
            gender,
            height,
            age,
            weight,
            inventoryId
          }
        }`, variables: {uuid}
    })
  }

  create(characterFormGroup: FormGroup): Observable<ApolloQueryResult<Character>> {
    let character: Character;
    character = characterFormGroup.value;
    console.log("Character", character);

    return this.apollo.query({
      query: gql`
        query createCharacter($input: CharacterInput) {
          createCharacter(input: $input) {
            uuid,
            name,
            description,
            gender,
            height,
            age,
            weight,
            inventoryId
          }
        }
      `, variables: {input: character}
    });
  }

}
