import { selectTotalDuration } from 'store/selectors'

describe('selectTotalDuration', () => {
  it('1 interval, 1 cycle: no rest or recovery after the last exercise', () => {
    const storeState: any = {
      timer: {
        initialCountdown: 10,
        warmup: 10,
        exercise: 10,
        rest: 10,
        numIntervals: 1,
        recovery: 10,
        numCycles: 1,
        cooldownInterval: 10,
        currentState: 'playing',
        currentInterval: 1,
        currentCycle: 1,
      },
    }
    expect(selectTotalDuration(storeState)).toEqual(40) // countdown + warmup + exercise + cooldown
  })
  it('2 intervals, 1 cycle', () => {
    const storeState: any = {
      timer: {
        initialCountdown: 10,
        warmup: 10,
        exercise: 10,
        rest: 10,
        numIntervals: 2,
        recovery: 10,
        numCycles: 1,
        cooldownInterval: 10,
        currentState: 'playing',
        currentInterval: 1,
        currentCycle: 1,
      },
    }
    expect(selectTotalDuration(storeState)).toEqual(60) // countdown + warmup + (ex, rest, ex) + cooldown
  })
  it('2 intervals, 2 cycles', () => {
    const storeState: any = {
      timer: {
        initialCountdown: 10,
        warmup: 10,
        exercise: 10,
        rest: 10,
        numIntervals: 2,
        recovery: 10,
        numCycles: 2,
        cooldownInterval: 10,
        currentState: 'playing',
        currentInterval: 1,
        currentCycle: 1,
      },
    }
    expect(selectTotalDuration(storeState)).toEqual(100) // countdown + warmup + (ex, rest, ex) + recovery + (ex, rest, ex) + cooldown
  })
})
