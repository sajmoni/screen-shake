# quake

Screen shake for javascript games.

Based on [this GDC talk by Squirrel Eiserloh](https://www.youtube.com/watch?v=tu-Qe66AvtY)

Features: 

 - :+1: Works with any rendering library or game engine
 - :yum: Uses `Perlin noise` and `exponential trauma` for a more satisfying shake
 - :zap: Less than 50 LOC and only 1 dependency
 
## API:

You first need to create a quake instance by using the default export

```js
import quake from 'quake'

const q = quake()
```

Configuration options
 
```js
 quake = ({
   // The maximum amount of angle movement. 
  maxAngle = MAX_ANGLE,
  // The maximum amount of x offset movement.
  maxOffsetX = MAX_OFFSET,
  // The maximum amount of y offset movement.
  maxOffsetY = MAX_OFFSET,
  // How much trauma is reduced per update. Tweak this if you want to change the duration of the screen shake.  
  traumaReductionPerUpdate = TRAUMA_REDUCTION_PER_UPDATE,
} 
```

The quake instance has two methods:

### add

`(trauma: number) => void`

How much trauma to add.

The maximum amount you can add is 1 (equal to 100% trauma).

### update

`(time: number) => ({ angle: number, offsetX: number, offsetY: number })`

Call this on every update of your game loop.

Has one argument, the `time` since update was first called. This is used to smoothly interpolate the noise. 

Returns an object the values to apply to your camera:

  - angle: Current angle. Set as your camera angle,
  - offsetX: Add this to your cameras x position,
  - offsetY: Add this to your cameras y position,

### example

```js
import quake from 'quake'

// Create the quake instance. Configuration is optional.
const q = quake()

if (projectileHit) {
  // Add 10% trauma when hit
  q.add(0.1)
}

let time = 1
gameLoop(() => {
  const { angle, offsetX, offsetY } = q.update(time)
  
  camera.angle = angle
  camera.position.x += offsetX
  camera.position.y += offsetY
  
  time++
})
```

### recipes

Initialize the quake instance in a file and export the instance.

`screenShake.js`

```js
import quake from 'quake'

export default quake()
```
