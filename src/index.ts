import ParkMiller from 'park-miller'
import { createNoise2D } from 'simplex-noise'

import getRandomInt from './getRandomInt'

export type ScreenShakeOptions = {
  maxAngle?: number
  maxOffsetX?: number
  maxOffsetY?: number
  /**
   * The amount of updates until trauma goes from 1 to 0
   */
  duration?: number
  seed?: number
  speed?: number
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
  speed = 0.4,
}: ScreenShakeOptions = {}): ScreenShakeInstance {
  let currentTrauma = 0

  const random = new ParkMiller(seed ?? getRandomInt())

  const anglePerlin = createNoise2D(() => random.floatInRange(0, 1))
  const offsetXPerlin = createNoise2D(() => random.floatInRange(0, 1))
  const offsetYPerlin = createNoise2D(() => random.floatInRange(0, 1))

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
      const timeToUse = time * speed

      const angle = maxAngle * shake * anglePerlin(timeToUse, 1)
      const offsetX = maxOffsetX * shake * offsetXPerlin(timeToUse, 1)
      const offsetY = maxOffsetY * shake * offsetYPerlin(timeToUse, 1)

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
