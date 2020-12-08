import Perlin from 'perlin-simplex'

const MAX_ANGLE = 10
const MAX_OFFSET = 30
const TRAUMA_REDUCTION_PER_UPDATE = 0.03

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

type QuakeInstance = {
  add: (trauma: number) => void
  update: (time: number) => UpdateResult
}

const quake = ({
  maxAngle = MAX_ANGLE,
  maxOffsetX = MAX_OFFSET,
  maxOffsetY = MAX_OFFSET,
  traumaReductionPerUpdate = TRAUMA_REDUCTION_PER_UPDATE,
}: Options = {}): QuakeInstance => {
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

export default quake
