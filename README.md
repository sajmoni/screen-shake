# screen-shake

Screen shake for JavaScript / TypeScript games.

Based on [this GDC talk by Squirrel Eiserloh](https://www.youtube.com/watch?v=tu-Qe66AvtY)

Features:

- :+1: Works with any JS/TS rendering library or game engine
- :yum: Uses `Perlin noise` and `exponential trauma` for a more satisfying shake
- :zap: Less than 50 LOC and only 1 dependency
- Fully typed

## API:

You first need to create an instance by using the default export

```ts
import createScreenShake from 'screen-shake'

const screenShake = createScreenShake()
```

Configuration options

```ts
createScreenShake({
  // The maximum amount of angle movement.
  maxAngle = 10,
  // The maximum amount of x offset movement.
  maxOffsetX = 30,
  // The maximum amount of y offset movement.
  maxOffsetY = 30,
  // How much trauma is reduced per update. Tweak this if you want to change the duration of the screen shake. A higher value means a shorter duration.
  traumaReductionPerUpdate = 0.03,
})
```

The screen shake instance has two methods:

### add

`(trauma: number) => void`

How much trauma to add between 0 and 1 (equal to 100% trauma).

### update

`(time: number) => ({ angle: number, offsetX: number, offsetY: number })`

Call this on every update of your game loop.

Has one argument, the `time` since update was first called. (This is used to smoothly interpolate the noise)

Returns an object with the values to apply to your camera:

- `angle` Current angle. _Set_ as your camera angle.
- `offsetX` _Add_ this to your cameras x position.
- `offsetY` _Add_ this to your cameras y position.

### Example

```ts
import createScreenShake from 'screen-shake'

// Create the quake instance. Configuration is optional.
const screenShake = createScreenShake()

if (projectileHit) {
  // Add 10% trauma when hit
  screenShake.add(0.1)
}

let time = 1
gameLoop(() => {
  const { angle, offsetX, offsetY } = screenShake.update(time)

  camera.angle = angle
  camera.position.x += offsetX
  camera.position.y += offsetY

  time++
})
```

### Recipes

Initialize the screen shake instance in a file and export the instance.

`screenShake.ts`

```ts
import createScreenShake from 'screen-shake'

export default createScreenShake()
```
