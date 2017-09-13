const Lab = require('lab')
const lab = exports.lab = Lab.script()
const describe = lab.describe
const it = lab.it
const expect = Lab.expect
const createMower = require('../src/createMower')

lab.experiment('createMower', () => {
  function getMower () {
    return createMower({
      upperRightCorner: [5, 5],
      initialPosition: {
        coordinate: [1, 2],
        direction: [0, 1]
      }
    })
  }

  lab.test(
    'return object contains initial position with the given position', (done) => {
      expect(getMower().position).to.equal({
        coordinate: [1, 2],
        direction: [0, 1]
      })
      done()
    }
  )

  describe('move', () => {
    it('should rotate 90 degree left when given input `L`', (done) => {
      const mower = getMower()
      mower.move('L')
      expect(mower.position).to.equal({
        coordinate: [1, 2],
        direction: [-1, 0]
      })
      done()
    })

    it('should rotate back to origin input `L` 4 times', (done) => {
      const mower = getMower()
      mower.move('L')
      mower.move('L')
      mower.move('L')
      mower.move('L')
      expect(mower.position).to.equal({
        coordinate: [1, 2],
        direction: [0, 1]
      })
      done()
    })

    it('should rotate 90 degree right when given input `R`', (done) => {
      const mower = getMower()
      mower.move('R')
      expect(mower.position).to.equal({
        coordinate: [1, 2],
        direction: [1, 0]
      })
      done()
    })

    it('should rotate back to clock-wise given input `R` 7 times', (done) => {
      const mower = getMower()
      mower.move('R')
      mower.move('R')
      mower.move('R')
      mower.move('R')
      mower.move('R')
      mower.move('R')
      mower.move('R')
      expect(mower.position).to.equal({
        coordinate: [1, 2],
        direction: [-1, 0]
      })
      done()
    })

    it('should move towards the direction when given input `F`', (done) => {
      const mower = getMower()
      mower.move('R')
      mower.move('F')
      expect(mower.position).to.equal({
        coordinate: [2, 2],
        direction: [1, 0]
      })
      done()
    })

    it('should not move if the position after the move is outside the lawn', (done) => {
      const mower1 = getMower()
      mower1.move('L')
      mower1.move('F')
      mower1.move('L')
      mower1.move('F')
      mower1.move('L')
      mower1.move('F')
      mower1.move('R')
      mower1.move('F')
      mower1.move('F')
      expect(mower1.position).to.equal({
        coordinate: [1, 0],
        direction: [0, -1]
      })

      const mower2 = getMower()
      mower2.move('L')
      mower2.move('F')
      mower2.move('F')
      mower2.move('R')
      mower2.move('F')
      mower2.move('F')
      mower2.move('R')
      mower2.move('F')
      mower2.move('F')
      mower2.move('F')
      mower2.move('F')
      mower2.move('F')
      mower2.move('F')
      expect(mower2.position).to.equal({
        coordinate: [5, 4],
        direction: [1, 0]
      })
      done()
    })
  })
})
