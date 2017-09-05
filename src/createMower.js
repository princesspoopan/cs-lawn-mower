const invariant = require('invariant')

module.exports = function createMower ({
  upperRightCorner,
  initialPosition = {
    coordinate: { x: 0, y: 0 },
    direction: 'N'
  }
}) {

  const directions = ['N', 'E', 'S', 'W']

  invariant(upperRightCorner, 'upperRightCorner is missing')
  invariant(
    directions.indexOf(initialPosition.direction) >= 0,
    'direction of initialPosition is incorrect'
   )
  invariant(
    !isOutSideLawn(initialPosition.coordinate),
    'initialPosition is outside the lawn'
   )

  let position = initialPosition

  function getNextDirection (direction) {
    const currentIndex = directions.indexOf(position.direction)
    const nextIndex = ((currentIndex + direction) + 4) % 4
    return directions[nextIndex]
  }

  function isOutSideLawn (coordinate) {
    return coordinate.x < 0 || coordinate.x > upperRightCorner.x ||
      coordinate.y < 0 || coordinate.y > upperRightCorner.y
  }

  function getNextCoordinate () {
    const { x, y } = position.coordinate
    let nextCoordinate
    switch (position.direction) {
      case 'N':
        nextCoordinate = { x, y: y + 1 }
        break
      case 'E':
        nextCoordinate = { x: x + 1, y }
        break
      case 'S':
        nextCoordinate = { x, y: y - 1 }
        break
      case 'W':
        nextCoordinate = { x: x - 1, y }
        break
    }
    return isOutSideLawn(nextCoordinate) ? position.coordinate : nextCoordinate
  }

  return {
    position,
    move (command) {
      switch (command) {
        case 'L':
          position.direction = getNextDirection(-1)
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
