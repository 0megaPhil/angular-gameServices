import {User} from "../user/user";
import {Inventory} from "../inventory/inventory";

export class Skill {
  constructor(public uuid: string, public name: string, public description: string) {
  }
}


export class CharacterSkill {
  constructor(public skillId: string, public name: string, public skillValue: number, public description: string) {
  }
}

export class Stat {
  constructor(public name: string, public description: string, public uuid?: string) {
  }
}

export class Race {
  constructor(public name: string, public description: string, public uuid?: string, public worldId?: string) {
  }
}


export class CharacterStat {
  constructor(public statId: string, public name: string, public statValue: number, public description?: string) {
  }
}

export class Dimension {
  constructor(public name: string, public unitType: string, public value: number, public description?: string) {
  }
}


export class Character {
  constructor(
    public name: string,
    public summary?: string,
    public appearance?: string,
    public personality?: string,
    public background?: string,
    public sex?: string,
    public race?: Race,
    public dimensions?: Dimension[],
    public user?: User,
    public inventory?: Inventory,
    public skills?: CharacterSkill[],
    public stats?: CharacterStat[],
    public uuid?: string,
  ) {
  }

  filtered(): Character {
    return new Character(this.name, this.summary,
      this.appearance, this.personality, this.background, this.sex, this.race,
      this.dimensions, this.user, this.inventory, this.skills, this.stats, this.uuid)
  }
}
