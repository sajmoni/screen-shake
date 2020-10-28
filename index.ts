import Perlin from 'perlin-simplex'

const MAX_ANGLE = 10
const MAX_OFFSET = 30
const TRAUMA_REDUCTION_PER_UPDATE = 0.03

const quake = ({
  maxAngle = MAX_ANGLE,
  maxOffsetX = MAX_OFFSET,
  maxOffsetY = MAX_OFFSET,
  traumaReductionPerUpdate = TRAUMA_REDUCTION_PER_UPDATE,
} = {}) => {
  let currentTrauma = 0
  const anglePerlin = new Perlin()
  const offsetXPerlin = new Perlin()
  const offsetYPerlin = new Perlin()

  return {
    add: (trauma) => {
      currentTrauma = Math.min(currentTrauma + trauma, 1)
    },
    update: (time) => {
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
