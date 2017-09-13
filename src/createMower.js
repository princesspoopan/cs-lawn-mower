const invariant = require('invariant')

module.exports = function createMower ({
  upperRightCorner,
  initialPosition = {
    coordinate: [0, 0],
    direction: [0, 1]
  }
}) {
  invariant(upperRightCorner, 'upperRightCorner is missing')
  invariant(
    !isOutSideLawn(initialPosition.coordinate),
    'initialPosition is outside the lawn'
  )

  let position = initialPosition
  function getNextDirection (rotation) {
    const zeroQuirks = (number) => (
      number === 0 ? 0 : number // this is for -0
    )
    return [
      zeroQuirks(position.direction[1] * rotation),
      zeroQuirks(position.direction[0] * (-1 * rotation))
    ]
  }

  function isOutSideLawn (coordinate) {
    return coordinate[0] < 0 || coordinate[0] > upperRightCorner[0] ||
      coordinate[1] < 0 || coordinate[1] > upperRightCorner[1]
  }

  function getNextCoordinate () {
    const { coordinate, direction } = position
    const nextCoordinate = [coordinate[0] + direction[0], coordinate[1] + direction[1]]
    return isOutSideLawn(nextCoordinate) ? position.coordinate : nextCoordinate
  }

  return {
    position,
    move (command) {
      switch (command) {
      case 'L': position.direction = getNextDirection(-1)
        break
      case 'R':
        position.direction = getNextDirection(1)
        break
      case 'F':
        position.coordinate = getNextCoordinate()
        break
      }
    }
  }
}
