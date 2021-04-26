import { selectTotalDuration } from 'store/selectors'

describe('selectTotalDuration', () => {
  it('test 1 cycle 1 cycle', () => {
    const storeState: any = {
      timer: {
        initialCountdown: 10,
        warmup: 10,
        exercise: 10,
        rest: 10,
        numRounds: 1,
        recovery: 10,
        numCycles: 1,
        cooldownInterval: 10,
        currentState: 'playing',
        currentRound: 1,
        currentCycle: 1,
      },
    }
    expect(selectTotalDuration(storeState)).toEqual(50)
  })
  it('test 2 cycles 1 cycle', () => {
    const storeState: any = {
      timer: {
        initialCountdown: 10,
        warmup: 10,
        exercise: 10,
        rest: 10,
        numRounds: 2,
        recovery: 10,
        numCycles: 1,
        cooldownInterval: 10,
        currentState: 'playing',
        currentRound: 1,
        currentCycle: 1,
      },
    }
    expect(selectTotalDuration(storeState)).toEqual(70)
  })
  it('test 2 cycles 2 cycles', () => {
    const storeState: any = {
      timer: {
        initialCountdown: 10,
        warmup: 10,
        exercise: 10,
        rest: 10,
        numRounds: 2,
        recovery: 10,
        numCycles: 2,
        cooldownInterval: 10,
        currentState: 'playing',
        currentRound: 1,
        currentCycle: 1,
      },
    }
    expect(selectTotalDuration(storeState)).toEqual(110)
  })
})
