import {Injectable} from '@angular/core';
import {map, mergeMap, Observable} from "rxjs";
import {FormGroup} from "@angular/forms";
import {Character, CharacterStat, Dimension, Race, Skill, Stat} from "./character";
import {Apollo, gql} from "apollo-angular";
import {ApolloQueryResult} from "@apollo/client";
import {Flavor} from "./flavor";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private readonly _apollo: Apollo;
  private _statMap: Map<String, Stat>
  private _skillMap: Map<String, Skill>
  private _racesMap: Map<String, Race>

  constructor(apollo: Apollo) {
    this._apollo = apollo;
    this._stats = []
    this._skills = []
    this._races = []
    this._skillMap = new Map();
    this._statMap = new Map();
    this._racesMap = new Map();
    this.getSkills(1000).subscribe(obj => {
      this._skills = obj.data['allSkills'];
      console.log("Skills", this._skills)
      for (let i = this._skills.length - 1; i >= 0; i--) {
        this._skillMap.set(this._skills[i].name.toLowerCase(), this._skills[i]);
      }
    })
    this.getStats(1000).subscribe(obj => {
      this._stats = obj.data['allStats'];
      console.log("Stats", this._stats)
      for (let i = this._stats.length - 1; i >= 0; i--) {
        this._statMap.set(this._stats[i].name.toLowerCase(), this._stats[i]);
      }
    })
    this.getRaces(1000).subscribe(obj => {
      this._races = obj.data['allRaces'];
      console.log("Races", this._races)
      for (let i = this._races.length - 1; i >= 0; i--) {
        this._racesMap.set(this._races[i].name.toUpperCase(), this._races[i]);
      }
    })
  }

  private _stats: Stat[]

  get stats(): Stat[] {
    return this._stats;
  }

  private _skills: Skill[]

  get skills(): Skill[] {
    return this._skills;
  }

  private _races: Race[]

  get races(): Race[] {
    return this._races;
  }

  getSkills(limit: Number): Observable<ApolloQueryResult<{ [key: string]: Skill[]; }>> {
    return this._apollo.query({
      query: gql`
        query allSkills($limit: Int) {
          allSkills(limit: $limit) {
            uuid
            name
            description
          }
        }`, variables: {limit: limit}
    })
  }

  getRaces(limit: Number): Observable<ApolloQueryResult<{ [key: string]: Race[]; }>> {
    return this._apollo.query({
      query: gql`
        query allRaces($limit: Int) {
          allRaces(limit: $limit) {
            uuid
            name
            description
            worldId
          }
        }`, variables: {limit: limit}
    })
  }

  createStat(stat: Stat): Observable<ApolloQueryResult<Stat>> {
    return this._apollo.query({
      query: gql`
        query createStat($input: StatInput) {
          createStat(input: $input) {
            uuid
            name
            description
          }
        }`, variables: {input: stat}
    });
  }

  updateStat(stat: Stat): Observable<ApolloQueryResult<Stat>> {
    return this._apollo.query({
      query: gql`
        query updateStat($input: StatInput) {
          updateStat(input: $input) {
            uuid
            name
            description
          }
        }`, variables: {input: stat}
    });
  }

  createSkill(skill: Skill): Observable<ApolloQueryResult<Skill>> {
    return this._apollo.query({
      query: gql`
        query createSkill($input: SkillInput) {
          createSkill(input: $input) {
            uuid
            name
            description
          }
        }`, variables: {input: skill}
    });
  }

  updateSkill(skill: Skill): Observable<ApolloQueryResult<Skill>> {
    return this._apollo.query({
      query: gql`
        query updateSkill($input: SkillInput) {
          updateSkill(input: $input) {
            uuid
            name
            description
          }
        }`, variables: {input: skill}
    });
  }

  getStats(limit: Number): Observable<ApolloQueryResult<{ [key: string]: Stat[]; }>> {
    return this._apollo.query({
      query: gql`
        query allStats($limit: Int) {
          allStats(limit: $limit) {
            uuid,
            name,
            description
          }
        }`, variables: {limit: limit}
    })
  }

  getCharacters(limit: Number): Observable<ApolloQueryResult<{ [key: string]: Character[]; }>> {
    return this._apollo.query({
      query: gql`
        query AllCharacters($limit: Int) {
          allCharacters(limit: $limit) {
            uuid
            name
            summary
            appearance
            personality
            background
            sex
            dimensions {
              name
              unitType
              value
              description
            }
            user {
              uuid
            }
            race {
              uuid
              name
              description
            }
            inventory {
              uuid
              items {
                uuid
                itemId
                name
                quantity
                inventoryId
              }
              currencies {
                uuid
                currencyId
                name
                quantity
                inventoryId
              }
              characterId
            }
            skills {
              skillId
              name
              skillValue
            }
            stats {
              statId
              name
              statValue
            }
          }
        }`, variables: {limit: limit}
    })
  }

  flavorByCharacterId(uuid: string): Observable<ApolloQueryResult<{ [key: string]: Flavor; }>> {
    return this._apollo.query({
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

  getById(uuid: string): Observable<ApolloQueryResult<Character>> {
    return this._apollo.query({
      query: gql`
        query characterById($uuid: ID) {
          characterById(uuid: $uuid) {
            uuid
            name
            summary
            appearance
            personality
            background
            sex
            dimensions {
              name
              unitType
              value
              description
            }
            user {
              uuid
            }
            race {
              uuid
              name
              description
            }
            inventory {
              uuid
              items {
                uuid
                itemId
                name
                quantity
                inventoryId
              }
              currencies {
                uuid
                currencyId
                name
                quantity
                inventoryId
              }
              characterId
            }
            skills {
              skillId
              name
              skillValue
            }
            stats {
              statId
              name
              statValue
            }
          }
        }`, variables: {uuid}
    })
  }

  createCharacter(characterFormGroup: FormGroup): Observable<ApolloQueryResult<Character>> {
    let character: Character;
    character = characterFormGroup.value;
    console.log("Character", character);
    character.stats = []

    return this.applyStat(character, 'strength', '', characterFormGroup)
      .pipe(mergeMap(character => {
        console.log(character)
        return this.applyStat(character, 'intelligence', '', characterFormGroup)
      }))
      .pipe(mergeMap(character => {
        console.log(character)
        return this.applyStat(character, 'wisdom', '', characterFormGroup)
      }))
      .pipe(mergeMap(character => {
        console.log(character)
        return this.applyStat(character, 'dexterity', '', characterFormGroup)
      }))
      .pipe(mergeMap(character => {
        console.log(character)
        return this.applyStat(character, 'charisma', '', characterFormGroup)
      }))
      .pipe(mergeMap(character => {
        console.log(character)
        return this.applyStat(character, 'constitution', '', characterFormGroup)
      }))
      .pipe(mergeMap(character => {
        let dimensions: Dimension[] = []
        character.race = this._racesMap.get(characterFormGroup.controls['race'].value.toUpperCase())
        dimensions.push(new Dimension('age', "Year", characterFormGroup.controls['age'].value))
        dimensions.push(new Dimension('height', "Inch", characterFormGroup.controls['height'].value))
        dimensions.push(new Dimension('weight', "Pound", characterFormGroup.controls['weight'].value))
        character.dimensions = dimensions
        character.skills = []
        console.log(character)
        try {
          return this.createCharacterQuery(character.filtered())
        } catch (exc) {
          console.log("ERROR:", exc)
          throw exc
        }

      }))


  }

  applyStat(character: Character, statName: string,
            statDescription: string, characterFormGroup: FormGroup): Observable<Character> {
    statName = statName.toLowerCase()
    let observable
    if (this._statMap.get(statName) === undefined) {
      observable = this.createStat(new Stat(statName, statDescription))
    } else {
      observable = this.updateStat(new Stat(statName, statDescription, this._statMap.get(statName)?.uuid))
    }
    return observable.pipe(map(result => {
      if (character.stats === undefined) {
        character.stats = []
      }
      let stat = result.data
      if (stat.uuid !== undefined) {
        character.stats.push(
          new CharacterStat(stat.uuid, stat.name,
            characterFormGroup.controls[statName].value))
        this._statMap.set(result.data.name, result.data)
      }
      return character
    }))

  }

  createCharacterQuery(character: Character): Observable<ApolloQueryResult<Character>> {
    return this._apollo.query({
      query: gql`
        query createCharacter($input: CharacterInput) {
          createCharacter(input: $input) {
            uuid
            name
            summary
            appearance
            personality
            background
            sex
            dimensions {
              name
              unitType
              value
              description
            }
            user {
              uuid
            }
            race {
              uuid
              name
              description
            }
            inventory {
              uuid
              items {
                uuid
                itemId
                name
                quantity
                inventoryId
              }
              currencies {
                uuid
                currencyId
                name
                quantity
                inventoryId
              }
              characterId
            }
            skills {
              skillId
              name
              skillValue
            }
            stats {
              statId
              name
              statValue
            }
          }
        }
      `, variables: {input: character}
    });
  }

}
