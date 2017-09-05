const fs = require('fs')
const invariant = require('invariant')
const createMower = require('../src/createMower')

const input = fs.readFileSync(__dirname + '/input.txt', { encoding: 'UTF8' })
// filter out empty lines
const argvs = input.split('\n').filter(text => text)

invariant(argvs[0], 'missing upperRightCorner')
const upperRightCoordinate = argvs[0].split(' ')
invariant(upperRightCoordinate.length === 2, 'upperRightCoordinate should have format eg. 5 5')

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

const output = mowerArgvs.map(mowerArgv => {
  const initialPosition = mowerArgv.initialPosition
  const mower = createMower({
    upperRightCorner: { x: +upperRightCoordinate[0], y: +upperRightCoordinate[1]},
    initialPosition: {
      coordinate: { x: +initialPosition[0], y: +initialPosition[1] },
      direction: initialPosition[2]
    }
  })
  mowerArgv.commands.forEach(command => {
    mower.move(command)
  })
  return mower.position
}).map(finalPosition => (
  finalPosition.coordinate.x + ' ' + finalPosition.coordinate.y + ' ' + finalPosition.direction)
).join('\n')

console.log(output)
