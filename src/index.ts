import ParkMiller from 'park-miller'
import getRandomInt from './getRandomInt'
import createNoise from './noise'

export type ScreenShakeOptions = {
  maxAngle?: number
  maxOffsetX?: number
  maxOffsetY?: number
  /**
   * The amount of updates until trauma goes from 1 to 0
   */
  duration?: number
  /**
   * A number between 0-1
   */
  seed?: number
}

export type ScreenShakeUpdateResult = {
  angle: number
  offsetX: number
  offsetY: number
}

export type ScreenShakeInstance = {
  add: (trauma: number) => void
  update: (time: number) => ScreenShakeUpdateResult
}

export default function createScreenShake({
  maxAngle = 10,
  maxOffsetX = 30,
  maxOffsetY = 30,
  duration = 50,
  seed,
}: ScreenShakeOptions = {}): ScreenShakeInstance {
  let currentTrauma = 0

  const random = new ParkMiller(seed ?? getRandomInt())
  const randomValue = random.floatInRange(0, 1)
  const anglePerlin = createNoise(randomValue)
  const offsetXPerlin = createNoise(randomValue)
  const offsetYPerlin = createNoise(randomValue)

  const traumaReductionPerUpdate = 1 / duration

  let latestScreenShake = {
    angle: 0,
    offsetX: 0,
    offsetY: 0,
  }

  return {
    add: (trauma: number) => {
      currentTrauma = Math.min(currentTrauma + trauma, 1)
    },
    update: (time: number) => {
      const previousScreenShake = {
        ...latestScreenShake,
      }

      const shake = currentTrauma ** 2

      const angle = maxAngle * shake * anglePerlin.noise(time, 1)
      const offsetX = maxOffsetX * shake * offsetXPerlin.noise(time, 1)
      const offsetY = maxOffsetY * shake * offsetYPerlin.noise(time, 1)

      currentTrauma = Math.max(currentTrauma - traumaReductionPerUpdate, 0)
      latestScreenShake = { angle, offsetX, offsetY }

      return {
        angle: angle - previousScreenShake.angle,
        offsetX: offsetX - previousScreenShake.offsetX,
        offsetY: offsetY - previousScreenShake.offsetY,
      }
    },
  }
}
