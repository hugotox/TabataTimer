import { selectWorkflow } from 'store/selectors'

// compact [state, duration] view of the workflow, easier to read in assertions
const steps = (state: any) =>
  selectWorkflow(state).map((item) => [item.currentState, item.duration])

describe('selectWorkflow', () => {
  it('works', () => {
    const storeState: any = {
      timer: {
        initialCountdown: 3,
        warmup: 120,
        exercise: 30,
        rest: 10,
        recovery: 50,
        cooldownInterval: 60,
        numIntervals: 2,
        numCycles: 2,
        currentState: 'stopped',
        currentInterval: 1,
        currentCycle: 1,
      },
    }
    expect(steps(storeState)).toEqual([
      ['initialCountdown', 3],
      ['warmup', 120],

      // SET 1:

      // interval 1
      ['exercise', 30],
      ['rest', 10],

      // interval 2
      ['exercise', 30],
      ['recovery', 50],

      // SET 2:

      // interval 1
      ['exercise', 30],
      ['rest', 10],

      // interval 2
      ['exercise', 30],

      ['cooldownInterval', 60],
    ])
  })
  it('works - no initial countdown', () => {
    const storeState: any = {
      timer: {
        initialCountdown: 0,
        warmup: 120,
        exercise: 30,
        rest: 10,
        recovery: 50,
        cooldownInterval: 60,
        numIntervals: 2,
        numCycles: 2,
        currentState: 'stopped',
        currentInterval: 1,
        currentCycle: 1,
      },
    }
    expect(steps(storeState)).toEqual([
      ['warmup', 120],

      // SET 1:

      // interval 1
      ['exercise', 30],
      ['rest', 10],

      // interval 2
      ['exercise', 30],
      ['recovery', 50],

      // SET 2:

      // interval 1
      ['exercise', 30],
      ['rest', 10],

      // interval 2
      ['exercise', 30],

      ['cooldownInterval', 60],
    ])
  })
  it('works - no warmup', () => {
    const storeState: any = {
      timer: {
        initialCountdown: 3,
        warmup: 0,
        exercise: 30,
        rest: 10,
        recovery: 50,
        cooldownInterval: 60,
        numIntervals: 2,
        numCycles: 2,
        currentState: 'stopped',
        currentInterval: 1,
        currentCycle: 1,
      },
    }
    expect(steps(storeState)).toEqual([
      ['initialCountdown', 3],

      // SET 1:

      // interval 1
      ['exercise', 30],
      ['rest', 10],

      // interval 2
      ['exercise', 30],
      ['recovery', 50],

      // SET 2:

      // interval 1
      ['exercise', 30],
      ['rest', 10],

      // interval 2
      ['exercise', 30],

      ['cooldownInterval', 60],
    ])
  })
  it('works - even with no exercise', () => {
    const storeState: any = {
      timer: {
        initialCountdown: 3,
        warmup: 120,
        exercise: 0,
        rest: 10,
        recovery: 50,
        cooldownInterval: 60,
        numIntervals: 2,
        numCycles: 2,
        currentState: 'stopped',
        currentInterval: 1,
        currentCycle: 1,
      },
    }
    expect(steps(storeState)).toEqual([
      ['initialCountdown', 3],
      ['warmup', 120],

      // SET 1:

      // interval 1
      ['rest', 10],

      // interval 2
      ['recovery', 50],

      // SET 2:

      // interval 1
      ['rest', 10],

      // interval 2

      ['cooldownInterval', 60],
    ])
  })
  it('works - no rest', () => {
    const storeState: any = {
      timer: {
        initialCountdown: 3,
        warmup: 120,
        exercise: 30,
        rest: 0,
        recovery: 50,
        cooldownInterval: 60,
        numIntervals: 2,
        numCycles: 2,
        currentState: 'stopped',
        currentInterval: 1,
        currentCycle: 1,
      },
    }
    expect(steps(storeState)).toEqual([
      ['initialCountdown', 3],
      ['warmup', 120],

      // SET 1:

      // interval 1
      ['exercise', 30],

      // interval 2
      ['exercise', 30],
      ['recovery', 50],

      // SET 2:

      // interval 1
      ['exercise', 30],

      // interval 2
      ['exercise', 30],

      ['cooldownInterval', 60],
    ])
  })
  it('works - no recov', () => {
    const storeState: any = {
      timer: {
        initialCountdown: 3,
        warmup: 120,
        exercise: 30,
        rest: 10,
        recovery: 0,
        cooldownInterval: 60,
        numIntervals: 2,
        numCycles: 2,
        currentState: 'stopped',
        currentInterval: 1,
        currentCycle: 1,
      },
    }
    expect(steps(storeState)).toEqual([
      ['initialCountdown', 3],
      ['warmup', 120],

      // SET 1:

      // interval 1
      ['exercise', 30],
      ['rest', 10],

      // interval 2
      ['exercise', 30],
      ['rest', 10],

      // SET 2:

      // interval 1
      ['exercise', 30],
      ['rest', 10],

      // interval 2
      ['exercise', 30],

      ['cooldownInterval', 60],
    ])
  })
  it('works - no cooldown', () => {
    const storeState: any = {
      timer: {
        initialCountdown: 3,
        warmup: 120,
        exercise: 30,
        rest: 10,
        recovery: 50,
        cooldownInterval: 0,
        numIntervals: 2,
        numCycles: 2,
        currentState: 'stopped',
        currentInterval: 1,
        currentCycle: 1,
      },
    }
    expect(steps(storeState)).toEqual([
      ['initialCountdown', 3],
      ['warmup', 120],

      // SET 1:

      // interval 1
      ['exercise', 30],
      ['rest', 10],

      // interval 2
      ['exercise', 30],
      ['recovery', 50],

      // SET 2:

      // interval 1
      ['exercise', 30],
      ['rest', 10],

      // interval 2
      ['exercise', 30],
    ])
  })

  describe('cycle / interval counters (what the status bar shows)', () => {
    const counters = (recovery: number) =>
      selectWorkflow({
        timer: {
          initialCountdown: 0,
          warmup: 0,
          exercise: 30,
          rest: 10,
          recovery,
          cooldownInterval: 0,
          numIntervals: 2,
          numCycles: 2,
        },
      } as any).map((item) => [
        item.currentState,
        item.currentCycle,
        item.currentInterval,
      ])

    it('with recovery between cycles', () => {
      expect(counters(50)).toEqual([
        ['exercise', 2, 2],
        ['rest', 2, 1],
        ['exercise', 2, 1],
        ['recovery', 1, 2],
        ['exercise', 1, 2],
        ['rest', 1, 1],
        ['exercise', 1, 1],
      ])
    })

    it('rest between cycles (no recovery) counts down cycles like recovery', () => {
      expect(counters(0)).toEqual([
        ['exercise', 2, 2],
        ['rest', 2, 1],
        ['exercise', 2, 1],
        ['rest', 1, 2],
        ['exercise', 1, 2],
        ['rest', 1, 1],
        ['exercise', 1, 1],
      ])
    })
  })
})
