import { selectWorkflow } from 'store/selectors'

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
        numRounds: 2,
        numCycles: 2,
        currentState: 'stopped',
        currentRound: 1,
        currentCycle: 1,
      },
    }
    expect(selectWorkflow(storeState)).toEqual([
      ['initialCountdown', 3],
      ['warmup', 120],

      // SET 1:

      // round 1
      ['exercise', 30],
      ['rest', 10],

      // round 2
      ['exercise', 30],
      ['recovery', 50],

      // SET 2:

      // round 1
      ['exercise', 30],
      ['rest', 10],

      // round 2
      ['exercise', 30],
      ['recovery', 50],

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
        numRounds: 2,
        numCycles: 2,
        currentState: 'stopped',
        currentRound: 1,
        currentCycle: 1,
      },
    }
    expect(selectWorkflow(storeState)).toEqual([
      ['warmup', 120],

      // SET 1:

      // round 1
      ['exercise', 30],
      ['rest', 10],

      // round 2
      ['exercise', 30],
      ['recovery', 50],

      // SET 2:

      // round 1
      ['exercise', 30],
      ['rest', 10],

      // round 2
      ['exercise', 30],
      ['recovery', 50],

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
        numRounds: 2,
        numCycles: 2,
        currentState: 'stopped',
        currentRound: 1,
        currentCycle: 1,
      },
    }
    expect(selectWorkflow(storeState)).toEqual([
      ['initialCountdown', 3],

      // SET 1:

      // round 1
      ['exercise', 30],
      ['rest', 10],

      // round 2
      ['exercise', 30],
      ['recovery', 50],

      // SET 2:

      // round 1
      ['exercise', 30],
      ['rest', 10],

      // round 2
      ['exercise', 30],
      ['recovery', 50],

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
        numRounds: 2,
        numCycles: 2,
        currentState: 'stopped',
        currentRound: 1,
        currentCycle: 1,
      },
    }
    expect(selectWorkflow(storeState)).toEqual([
      ['initialCountdown', 3],
      ['warmup', 120],

      // SET 1:

      // round 1
      ['rest', 10],

      // round 2
      ['recovery', 50],

      // SET 2:

      // round 1
      ['rest', 10],

      // round 2
      ['recovery', 50],

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
        numRounds: 2,
        numCycles: 2,
        currentState: 'stopped',
        currentRound: 1,
        currentCycle: 1,
      },
    }
    expect(selectWorkflow(storeState)).toEqual([
      ['initialCountdown', 3],
      ['warmup', 120],

      // SET 1:

      // round 1
      ['exercise', 30],

      // round 2
      ['exercise', 30],
      ['recovery', 50],

      // SET 2:

      // round 1
      ['exercise', 30],

      // round 2
      ['exercise', 30],
      ['recovery', 50],

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
        numRounds: 2,
        numCycles: 2,
        currentState: 'stopped',
        currentRound: 1,
        currentCycle: 1,
      },
    }
    expect(selectWorkflow(storeState)).toEqual([
      ['initialCountdown', 3],
      ['warmup', 120],

      // SET 1:

      // round 1
      ['exercise', 30],
      ['rest', 10],

      // round 2
      ['exercise', 30],
      ['rest', 10],

      // SET 2:

      // round 1
      ['exercise', 30],
      ['rest', 10],

      // round 2
      ['exercise', 30],
      ['rest', 10],

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
        numRounds: 2,
        numCycles: 2,
        currentState: 'stopped',
        currentRound: 1,
        currentCycle: 1,
      },
    }
    expect(selectWorkflow(storeState)).toEqual([
      ['initialCountdown', 3],
      ['warmup', 120],

      // SET 1:

      // round 1
      ['exercise', 30],
      ['rest', 10],

      // round 2
      ['exercise', 30],
      ['recovery', 50],

      // SET 2:

      // round 1
      ['exercise', 30],
      ['rest', 10],

      // round 2
      ['exercise', 30],
      ['recovery', 50],
    ])
  })
})
