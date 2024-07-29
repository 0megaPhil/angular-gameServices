import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {FormGroup} from "@angular/forms";
import {Character} from "./character";
import {Apollo, gql} from "apollo-angular";
import {ApolloQueryResult} from "@apollo/client";
import {Flavor} from "./flavor";
import {Stat} from "./stat";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private readonly apollo: Apollo;

  constructor(apollo: Apollo) {
    this.apollo = apollo;
  }

  batchGet(limit: Number): Observable<ApolloQueryResult<{ [key: string]: Character[]; }>> {
    return this.apollo.query({
      query: gql`
        query AllCharacters($limit: Int) {
          allCharacters(limit: $limit) {
            uuid,
            name,
            description,
            gender,
            height,
            age,
            weight,
            inventoryId,
            stats {
              key
              value
              description
            }
          }
        }`, variables: {limit: limit}
    })
  }

  flavor(uuid: string): Observable<ApolloQueryResult<{ [key: string]: Flavor; }>> {
    return this.apollo.query({
      query: gql`
        query characterFlavor($uuid: ID) {
          characterFlavor(uuid: $uuid) {
            targetId,
            text,
            objectType
          }
        }`, variables: {uuid}
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
    character.stats = []
    character.stats.push(new Stat('strength', characterFormGroup.controls['strength'].value, ""))
    character.stats.push(new Stat('intelligence', characterFormGroup.controls['intelligence'].value, ""))
    character.stats.push(new Stat('wisdom', characterFormGroup.controls['wisdom'].value, ""))
    character.stats.push(new Stat('dexterity', characterFormGroup.controls['dexterity'].value, ""))
    character.stats.push(new Stat('charisma', characterFormGroup.controls['charisma'].value, ""))
    character.stats.push(new Stat('constitution', characterFormGroup.controls['constitution'].value, ""))

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
            stats {
              key
              value
              description
            }
          }
        }
      `, variables: {input: character}
    });
  }

}
