import { selectTotalDuration } from 'store/selectors'

describe('selectTotalDuration', () => {
  it('test 1 set 1 cycle', () => {
    const storeState: any = {
      timer: {
        initialCountdown: 10,
        warmup: 10,
        exercise: 10,
        rest: 10,
        numReps: 1,
        recovery: 10,
        numSets: 1,
        cooldownInterval: 10,
        currentState: 'playing',
        currentRep: 1,
        currentSet: 1,
      },
    }
    expect(selectTotalDuration(storeState)).toEqual(50)
  })
  it('test 2 sets 1 cycle', () => {
    const storeState: any = {
      timer: {
        initialCountdown: 10,
        warmup: 10,
        exercise: 10,
        rest: 10,
        numReps: 2,
        recovery: 10,
        numSets: 1,
        cooldownInterval: 10,
        currentState: 'playing',
        currentRep: 1,
        currentSet: 1,
      },
    }
    expect(selectTotalDuration(storeState)).toEqual(70)
  })
  it('test 2 sets 2 cycles', () => {
    const storeState: any = {
      timer: {
        initialCountdown: 10,
        warmup: 10,
        exercise: 10,
        rest: 10,
        numReps: 2,
        recovery: 10,
        numSets: 2,
        cooldownInterval: 10,
        currentState: 'playing',
        currentRep: 1,
        currentSet: 1,
      },
    }
    expect(selectTotalDuration(storeState)).toEqual(110)
  })
})
