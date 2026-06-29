export interface Attack {
  emoji: string
  damage: number
  cooldown: number
}

export interface Enemy {
  readonly name: string
  readonly emoji: string
  readonly color: string

  attack(): Attack
}

class Slime implements Enemy {
  name = 'Slime'
  emoji = '🟢'
  color = '#4ade80'
  attack(): Attack {
    return { emoji: '💧', damage: 1, cooldown: 1500 }
  }
}

class Bat implements Enemy {
  name = 'Murciélago'
  emoji = '🦇'
  color = '#a78bfa'
  attack(): Attack {
    return { emoji: '💨', damage: 1, cooldown: 850 }
  }
}

class Ghost implements Enemy {
  name = 'Fantasma'
  emoji = '👻'
  color = '#93c5fd'
  attack(): Attack {
    return { emoji: '🔮', damage: 1, cooldown: 1300 }
  }
}

class Dragon implements Enemy {
  name = 'Dragón'
  emoji = '🐉'
  color = '#fb923c'
  attack(): Attack {
    return { emoji: '🔥', damage: 2, cooldown: 1700 }
  }
}

export abstract class EnemyFactory {
  protected abstract createEnemy(): Enemy

  spawn(): Enemy {
    return this.createEnemy()
  }
}

export class EasyEnemyFactory extends EnemyFactory {
  protected createEnemy(): Enemy {
    return new Slime()
  }
}

export class HardEnemyFactory extends EnemyFactory {
  private readonly roster: (new () => Enemy)[] = [Slime, Bat, Ghost, Dragon]

  protected createEnemy(): Enemy {
    const i = Math.floor(Math.random() * this.roster.length)
    const ChosenEnemy = this.roster[i]
    return new ChosenEnemy()
  }
}

export type Difficulty = 'easy' | 'hard'

export function getEnemyFactory(difficulty: Difficulty): EnemyFactory {
  return difficulty === 'easy' ? new EasyEnemyFactory() : new HardEnemyFactory()
}
