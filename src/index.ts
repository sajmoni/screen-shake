import createNoise from './noise'

export type ScreenShakeOptions = {
  maxAngle?: number
  maxOffsetX?: number
  maxOffsetY?: number
  traumaReductionPerUpdate?: number
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
  traumaReductionPerUpdate = 0.02,
}: ScreenShakeOptions = {}): ScreenShakeInstance {
  let currentTrauma = 0

  const anglePerlin = createNoise()
  const offsetXPerlin = createNoise()
  const offsetYPerlin = createNoise()

  return {
    add: (trauma: number): void => {
      currentTrauma = Math.min(currentTrauma + trauma, 1)
    },
    update: (time: number): ScreenShakeUpdateResult => {
      const shake = currentTrauma ** 2
      const angle = maxAngle * shake * anglePerlin.noise(time, 1)
      const offsetX = maxOffsetX * shake * offsetXPerlin.noise(time, 1)
      const offsetY = maxOffsetY * shake * offsetYPerlin.noise(time, 1)

      currentTrauma = Math.max(currentTrauma - traumaReductionPerUpdate, 0)

      return {
        angle,
        offsetX,
        offsetY,
      }
    },
  }
}
