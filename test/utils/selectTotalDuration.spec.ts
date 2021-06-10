import { selectTotalDuration } from 'store/selectors'

describe('selectTotalDuration', () => {
  it('test 1 rep 1 rep', () => {
    const storeState: any = {
      timer: {
        initialCountdown: 10,
        warmup: 10,
        exercise: 10,
        rest: 10,
        numIntervals: 1,
        recovery: 10,
        numReps: 1,
        cooldownInterval: 10,
        currentState: 'playing',
        currentInterval: 1,
        currentRep: 1,
      },
    }
    expect(selectTotalDuration(storeState)).toEqual(50)
  })
  it('test 2 reps 1 rep', () => {
    const storeState: any = {
      timer: {
        initialCountdown: 10,
        warmup: 10,
        exercise: 10,
        rest: 10,
        numIntervals: 2,
        recovery: 10,
        numReps: 1,
        cooldownInterval: 10,
        currentState: 'playing',
        currentInterval: 1,
        currentRep: 1,
      },
    }
    expect(selectTotalDuration(storeState)).toEqual(70)
  })
  it('test 2 reps 2 reps', () => {
    const storeState: any = {
      timer: {
        initialCountdown: 10,
        warmup: 10,
        exercise: 10,
        rest: 10,
        numIntervals: 2,
        recovery: 10,
        numReps: 2,
        cooldownInterval: 10,
        currentState: 'playing',
        currentInterval: 1,
        currentRep: 1,
      },
    }
    expect(selectTotalDuration(storeState)).toEqual(110)
  })
})
