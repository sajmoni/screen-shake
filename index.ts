import Perlin from 'perlin-simplex'

type Options = {
  maxAngle?: number
  maxOffsetX?: number
  maxOffsetY?: number
  traumaReductionPerUpdate?: number
}

type UpdateResult = {
  angle: number
  offsetX: number
  offsetY: number
}

type ScreenShakeInstance = {
  add: (trauma: number) => void
  update: (time: number) => UpdateResult
}

const createScreenShake = ({
  maxAngle = 10,
  maxOffsetX = 30,
  maxOffsetY = 30,
  traumaReductionPerUpdate = 0.03,
}: Options = {}): ScreenShakeInstance => {
  let currentTrauma = 0

  const anglePerlin = new Perlin()
  const offsetXPerlin = new Perlin()
  const offsetYPerlin = new Perlin()

  return {
    add: (trauma: number): void => {
      currentTrauma = Math.min(currentTrauma + trauma, 1)
    },
    update: (time: number): UpdateResult => {
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

export default createScreenShake
