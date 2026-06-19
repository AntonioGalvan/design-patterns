import { useEffect, useRef, useState } from 'react'
import { getEnemyFactory } from './factory'
import type { Difficulty, Enemy } from './factory'
import './game.css'


const WALK_MIN = 4 
const WALK_MAX = 92
const PORTAL_X = 58
const CENTER_FROM = 46
const CENTER_TO = 64
const PLAYER_SPEED = 34
const PROJECTILE_SPEED = 24
const SPAWN_COOLDOWN = 1600
const FIRST_ATTACK_DELAY = 700
const MAX_ENEMIES = 4
const ENEMY_LIFESPAN = 9000
const HIT_RANGE = 2

type Status = 'menu' | 'playing' | 'paused'

type SpawnedEnemy = {
  id: number
  //Polimorfismo: el juego no sabe qué tipo de enemigo es, solo que cumple la interfaz Enemy
  enemy: Enemy
  x: number
  bornAt: number
  nextAttackAt: number
  lastAttackAt: number
  exiting: boolean
}

type Projectile = {
  id: number
  x: number
  emoji: string
  damage: number
}

type World = {
  playerX: number
  facing: 1 | -1
  walking: boolean
  enemies: SpawnedEnemy[]
  projectiles: Projectile[]
  lastSpawn: number
  summoned: number
  hits: number
  shakeUntil: number
}

type View = {
  now: number
  playerX: number
  facing: 1 | -1
  walking: boolean
  enemies: SpawnedEnemy[]
  projectiles: Projectile[]
  summoned: number
  hits: number
  shaking: boolean
}

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v))

const makeWorld = (): World => ({
  playerX: 10,
  facing: 1,
  walking: false,
  enemies: [],
  projectiles: [],
  lastSpawn: 0,
  summoned: 0,
  hits: 0,
  shakeUntil: 0,
})

const toView = (w: World, now: number): View => ({
  now,
  playerX: w.playerX,
  facing: w.facing,
  walking: w.walking,
  enemies: w.enemies,
  projectiles: w.projectiles,
  summoned: w.summoned,
  hits: w.hits,
  shaking: now < w.shakeUntil,
})

const initialView: View = {
  now: 0,
  playerX: 10,
  facing: 1,
  walking: false,
  enemies: [],
  projectiles: [],
  summoned: 0,
  hits: 0,
  shaking: false,
}

export default function Game() {
  const [status, setStatus] = useState<Status>('menu')
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [view, setView] = useState<View>(initialView)

  const worldRef = useRef<World>(makeWorld())
  const keysRef = useRef({ left: false, right: false })
  const idRef = useRef(0)
  const difficultyRef = useRef(difficulty)

  useEffect(() => {
    difficultyRef.current = difficulty
  }, [difficulty])

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase()
      if (k === 'arrowleft' || k === 'a') keysRef.current.left = true
      if (k === 'arrowright' || k === 'd') keysRef.current.right = true
      if (k === 'p' || k === 'escape') {
        setStatus((s) => (s === 'playing' ? 'paused' : s === 'paused' ? 'playing' : s))
      }
    }
    const onUp = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase()
      if (k === 'arrowleft' || k === 'a') keysRef.current.left = false
      if (k === 'arrowright' || k === 'd') keysRef.current.right = false
    }
    window.addEventListener('keydown', onDown)
    window.addEventListener('keyup', onUp)
    return () => {
      window.removeEventListener('keydown', onDown)
      window.removeEventListener('keyup', onUp)
    }
  }, [])

  useEffect(() => {
    if (status !== 'playing') return
    let raf = 0
    let prev = performance.now()

    const frame = (now: number) => {
      const dt = Math.min(now - prev, 50) / 1000
      prev = now
      const w = worldRef.current

      const dir = (keysRef.current.right ? 1 : 0) - (keysRef.current.left ? 1 : 0)
      w.walking = dir !== 0
      if (dir !== 0) w.facing = dir > 0 ? 1 : -1
      w.playerX = clamp(w.playerX + dir * PLAYER_SPEED * dt, WALK_MIN, WALK_MAX)

      const inCenter = w.playerX >= CENTER_FROM && w.playerX <= CENTER_TO
      if (inCenter && now - w.lastSpawn > SPAWN_COOLDOWN && w.enemies.length < MAX_ENEMIES) {
        //Aplicación del patrón: el juego (cliente) no sabe qué tipo de enemigo concreto recibe, solo que es un Enemy (producto abstracto)
        const factory = getEnemyFactory(difficultyRef.current)

        //El juego llama al método spawn() de la factory, que a su vez llama al factory method createEnemy() para decidir qué enemigo concreto crear con base en la dificultad.
        const enemy = factory.spawn()
        w.enemies.push({
          id: ++idRef.current,
          enemy,
          x: clamp(PORTAL_X + 8 + Math.random() * 16, 52, 88),
          bornAt: now,
          nextAttackAt: now + FIRST_ATTACK_DELAY,
          lastAttackAt: 0,
          exiting: false,
        })
        w.summoned++
        w.lastSpawn = now
      }

      for (const e of w.enemies) {
        if (!e.exiting && now >= e.nextAttackAt) {
          //Polimorfismo: cada enemigo ataca a su manera, pero el juego no necesita saber CÓMO lo hacen
          const atk = e.enemy.attack()
          w.projectiles.push({
            id: ++idRef.current,
            x: e.x,
            emoji: atk.emoji,
            damage: atk.damage,
          })
          e.nextAttackAt = now + atk.cooldown
          e.lastAttackAt = now
        }
        if (!e.exiting && now - e.bornAt > ENEMY_LIFESPAN) e.exiting = true
      }
      w.enemies = w.enemies.filter((e) => !(e.exiting && now - e.bornAt > ENEMY_LIFESPAN + 400))

      const alive: Projectile[] = []
      for (const p of w.projectiles) {
        p.x -= PROJECTILE_SPEED * dt
        if (p.x < WALK_MIN - 6) continue // salió de pantalla
        if (p.x <= w.playerX + HIT_RANGE && p.x >= w.playerX - HIT_RANGE) {
          w.hits += p.damage
          w.shakeUntil = now + 350
          continue
        }
        alive.push(p)
      }
      w.projectiles = alive

      setView(toView(w, now))
      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [status])

  const start = (d: Difficulty) => {
    worldRef.current = makeWorld()
    setView(toView(worldRef.current, performance.now()))
    setDifficulty(d)
    setStatus('playing')
  }

  const factoryName = difficulty === 'easy' ? 'EasyEnemyFactory' : 'HardEnemyFactory'

  return (
    <div className="game">
      <header className="hud">
        <div className="brand">
          Factory Forge <small>· Factory Method demo</small>
        </div>
        <div className="spacer" />
        <div className="stat">
          <b>{difficulty === 'easy' ? 'Fácil' : 'Difícil'}</b>
          <span>Dificultad</span>
        </div>
        <div className="stat">
          <b className="mono">{factoryName}</b>
          <span>Factory activa</span>
        </div>
        <div className="stat">
          <b>{view.summoned}</b>
          <span>Enemigos</span>
        </div>
        <div className="stat">
          <b>{view.hits}</b>
          <span>Golpes</span>
        </div>
        {status === 'playing' && (
          <button className="pause-btn" onClick={() => setStatus('paused')}>
            ⏸ Pausa
          </button>
        )}
      </header>

      <div className={`stage${view.shaking ? ' shake' : ''}`}>
        <div className="sky" />
        <div className="sun" />
        <div className="cloud cloud-a" />
        <div className="cloud cloud-b" />
        <div className="cloud cloud-c" />
        <div className="hills">
          <span className="hill hill-1" />
          <span className="hill hill-2" />
          <span className="hill hill-3" />
        </div>
        <div className="ground" />

        <div className="portal" style={{ left: `${PORTAL_X}%` }}>
          <span className="portal-ring" />
          <span className="portal-label">Centro · invoca enemigos</span>
        </div>

        {view.enemies.map((e) => (
          <div
            key={e.id}
            className={`char enemy${e.exiting ? ' exiting' : ''}${
              view.now - e.lastAttackAt < 160 ? ' attacking' : ''
            }`}
            style={{ left: `${e.x}%` }}
          >
            <span className="name">{e.enemy.name}</span>
            <span className="aura" style={{ background: e.enemy.color }} />
            <div className="flip">
              <span className="sprite">{e.enemy.emoji}</span>
            </div>
            <span className="feet-shadow" />
          </div>
        ))}

        {view.projectiles.map((p) => (
          <span key={p.id} className="projectile" style={{ left: `${p.x}%` }}>
            {p.emoji}
          </span>
        ))}

        <div
          className={`char player${view.walking ? ' walking' : ''}`}
          style={{ left: `${view.playerX}%` }}
        >
          <div className="flip" style={{ transform: `scaleX(${view.facing})` }}>
            <span className="sprite">🧙</span>
          </div>
          <span className="feet-shadow" />
        </div>

        {status !== 'playing' && (
          <div className="overlay">
            <div className="card">
              <h1>Factory Forge</h1>
              <p className="tagline">
                Camina hasta el <b>centro</b> y observa cómo el patrón{' '}
                <b>Factory Method</b> invoca a los enemigos.
              </p>

              <div className="seg" role="group" aria-label="Dificultad">
                <button
                  className={difficulty === 'easy' ? 'active' : ''}
                  onClick={() => setDifficulty('easy')}
                >
                  Fácil
                </button>
                <button
                  className={difficulty === 'hard' ? 'active' : ''}
                  onClick={() => setDifficulty('hard')}
                >
                  Difícil
                </button>
              </div>

              <p className="factory-note">
                Fábrica activa: <code>{factoryName}</code>
                <br />
                {difficulty === 'easy'
                  ? 'Siempre crea 🟢 Slime.'
                  : 'Crea al azar 🟢 🦇 👻 🐉.'}
              </p>

              <div className="actions">
                {status === 'menu' ? (
                  <button className="primary" onClick={() => start(difficulty)}>
                    ▶ Jugar
                  </button>
                ) : (
                  <>
                    <button className="primary" onClick={() => setStatus('playing')}>
                      ▶ Reanudar
                    </button>
                    <button onClick={() => start(difficulty)}>↻ Reiniciar</button>
                  </>
                )}
              </div>

              <p className="controls">
                ← → o A D para caminar · P / Esc para pausar
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
