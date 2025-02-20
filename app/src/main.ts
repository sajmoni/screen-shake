import { Application } from 'pixi.js'
import createGame from 'alchemy-engine'

import { keys, scenes, state } from './data'

import sounds from './sounds.json'

const app = new Application()

async function main() {
  await app.init({
    width: 640,
    height: 480,
    resolution: 2,
    antialias: true,
  })

  const spriteSheetPath = './asset/spritesheet/data.json'
  const font = '10pt "Helvetica"'

  createGame({
    app,
    state,
    scene: 'game',
    scenes,
    keys,
    sounds,
    spriteSheetPath,
    font,
    config: {
      pixelPerfect: true,
    },
  })
}

main()
