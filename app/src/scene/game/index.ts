import {
  sprite,
  htmlText,
  sync,
  graphics,
  container as createContainer,
  createObjectPool,
} from 'alchemy-engine'

import { type Scene } from '../../type'
import createScreenShake from '../../../../src/index.js'
import pause from './pause'

export default async function game(scene: Scene) {
  const {
    textures,
    container,
    input: { isKeyDown, debouncedKey },
    state,
    timer,
    app,
  } = scene

  // Set center point in the middle to allow for screen shake
  container.pivot.set(app.screen.width / 2, app.screen.height / 2)
  container.position.set(app.screen.width / 2, app.screen.height / 2)

  const screenShake = createScreenShake({
    maxOffsetX: 200,
    maxOffsetY: 200,
    maxAngle: 30,
    duration: 100,
  })

  timer.repeatEvery(1, (time) => {
    const { angle, offsetX, offsetY } = screenShake.update(time * 0.01)

    container.angle = container.angle + angle
    container.position.x = container.x + offsetX
    container.position.y = container.y + offsetY
  })

  const background = graphics(container)
  background.rect(10, 10, 100, 100).fill({ color: '#cccccc', alpha: 1 })
  background.position.set(100, 100)

  const c = createContainer(container)
  c.label = 'container'
  c.position.set(200, 200)

  const g = graphics(c)
  g.rect(0, 0, 100, 100).fill({ color: 0xbb22dd, alpha: 1 })
  g.label = 'big pink'
  g.scale.set(2)
  c.pivot.set(c.width / 2, c.height / 2)

  const _text = htmlText(c, { fontSize: 24, fill: 0xffffff }, 'number 24')
  _text.label = 'number 24'

  const spritePool = createObjectPool(10, () => {
    return sprite(container)
  })
  const s = spritePool.get()
  s.texture = textures['square-1']
  s.label = 'small blue'
  s.position.set(200, 200)

  sync(_text, 'text', state, 'gold')

  const s2 = sprite(container, textures['square-1'])
  s2.anchor.set(1)
  s2.label = 'other name'
  s2.position.set(350, 250)
  timer.repeatEvery(10, () => {
    s2.x += 1
  })

  debouncedKey(
    'Space',
    () => {
      screenShake.add(1)
    },
    1,
  )

  timer.repeatEvery(1, (_time, delta) => {
    if (isKeyDown(['a', 'ArrowLeft'])) {
      s.position.x -= 1 * delta
    }
    if (isKeyDown(['w', 'ArrowUp'])) {
      s.position.y -= 1 * delta
    }
    if (isKeyDown(['s', 'ArrowDown'])) {
      s.position.y += 1 * delta
    }
    if (isKeyDown(['d', 'ArrowRight'])) {
      s.position.x += 1 * delta
    }
  })

  pause(scene)
}
