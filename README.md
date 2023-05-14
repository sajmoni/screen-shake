# screen-shake

> Screen shake for JavaScript / TypeScript games

Based on [this GDC talk by Squirrel Eiserloh](https://www.youtube.com/watch?v=tu-Qe66AvtY)

## :sparkles: Features

- :+1: Works with any JS/TS rendering library or game engine
- :yum: Uses `Perlin noise` and `exponential trauma` for a more satisfying shake
- :zap: Around `700b` and `0` dependencies
- :safety_vest: Fully typed

## API

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
  // The amount of updates until trauma goes from 1 to 0
  duration = 50,
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

Returns an object with the values to add to your camera:

- `angle` - Add it to the cameras angle
- `offsetX` - Add it to the cameras x position
- `offsetY` - Add it to the cameras y position

### Example

```ts
import createScreenShake from 'screen-shake'

// Create the instance. Configuration is optional.
const screenShake = createScreenShake()

if (projectileHit) {
  // Add 10% trauma when hit
  screenShake.add(0.1)
}

let time = 1

// Save a copy of the camera at the original position
const baseCamera = {
  angle: camera.angle,
  x: camera.x
  y: camera.y
}

gameLoop(() => {
  const { angle, offsetX, offsetY } = screenShake.update(time)

  camera.angle = baseCamera.angle + angle
  camera.position.x = baseCamera.x + offsetX
  camera.position.y = baseCamera.y + offsetY

  time++
})
```

## :package: Install

```sh
npm install screen-shake
```

## :book: Recipes

### Export instance from file

Initialize the screen shake instance in a file and export the instance.

`screenShake.ts`

```ts
import createScreenShake from 'screen-shake'

export default createScreenShake()
```

### Change screen shake speed

Modify `time` before passing it to `update`

Example with 50% speed:

```ts
screenShake.update(time * 0.5)
```
