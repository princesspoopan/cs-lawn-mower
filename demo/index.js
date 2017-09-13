const fs = require('fs')
const invariant = require('invariant')
const createMower = require('../src/createMower')
const path = require('path')
const _ = require('lodash')

const input = fs.readFileSync(path.join(__dirname, '/input.txt'), { encoding: 'UTF8' })
// filter out empty lines
const argvs = input.split('\n').filter(text => text)

invariant(argvs[0], 'missing upperRightCorner')
const upperRightCorner = argvs[0].split(' ')
invariant(upperRightCorner.length === 2, 'upperRightCorner should have format eg. 5 5')

invariant(argvs.length > 3, 'missing input')

const mowerArgvs = []

argvs.slice(1).forEach((argv, index) => {
  const mowerIndex = Math.floor(index / 2)

  if ((index % 2) > 0) {
    mowerArgvs[mowerIndex].commands = argv.split('')
  } else {
    mowerArgvs[mowerIndex] = { }
    mowerArgvs[mowerIndex].initialPosition = argv.split(' ')
    invariant(
      mowerArgvs[mowerIndex].initialPosition.length === 3,
      'initialPosition should have format eg. 1 1 N'
    )
  }
})

const directions = {
  N: [0, 1],
  E: [1, 0],
  S: [0, -1],
  W: [-1, 0]
}

const output = mowerArgvs.map(mowerArgv => {
  const initialPosition = mowerArgv.initialPosition
  const mower = createMower({
    upperRightCorner,
    initialPosition: {
      coordinate: [+initialPosition[0], +initialPosition[1]],
      direction: directions[initialPosition[2]]
    }
  })
  mowerArgv.commands.forEach(command => {
    mower.move(command)
  })
  return mower.position
}).map(finalPosition => (
  finalPosition.coordinate[0] + ' ' + finalPosition.coordinate[1] + ' ' + _.findKey(directions, (direction) => _.isEqual(direction, finalPosition.direction)))
).join('\n')

console.log(output)
