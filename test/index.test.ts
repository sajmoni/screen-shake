import { expect, test } from 'vitest'
import createScreenShake, { type ScreenShakeUpdateResult } from '../src'

test('Screen shake', async () => {
  const screenShake = createScreenShake({ seed: 999 })
  screenShake.add(1)
  const results: ScreenShakeUpdateResult[] = []

  ;[...Array(4)].forEach((_, time) => {
    const result = screenShake.update(time)
    results.push(result)
  })

  expect(results).toMatchSnapshot()
})
