import { AppState } from 'store/slice'
import { createWorkflow } from 'utils'

describe('createWorkflow', () => {
  it('works', () => {
    const data: AppState = {
      initialCountdown: 3,
      warmup: 120,
      exercise: 30,
      rest: 10,
      recovery: 50,
      coolDownInterval: 60,
      numReps: 2,
      numSets: 2,
      currentState: 'stopped',
      currentRep: 1,
      currentSet: 1,
    }
    expect(createWorkflow(data)).toEqual([
      ['initialCountdown', 3],
      ['warmup', 120],

      // SET 1:

      // rep 1
      ['exercise', 30],
      ['rest', 10],

      // rep 2
      ['exercise', 30],
      ['recovery', 50],

      // SET 2:

      // rep 1
      ['exercise', 30],
      ['rest', 10],

      // rep 2
      ['exercise', 30],
      ['recovery', 50],

      ['coolDownInterval', 60],
    ])
  })
  it('works - no initial countdown', () => {
    const data: AppState = {
      initialCountdown: 0,
      warmup: 120,
      exercise: 30,
      rest: 10,
      recovery: 50,
      coolDownInterval: 60,
      numReps: 2,
      numSets: 2,
      currentState: 'stopped',
      currentRep: 1,
      currentSet: 1,
    }
    expect(createWorkflow(data)).toEqual([
      ['warmup', 120],

      // SET 1:

      // rep 1
      ['exercise', 30],
      ['rest', 10],

      // rep 2
      ['exercise', 30],
      ['recovery', 50],

      // SET 2:

      // rep 1
      ['exercise', 30],
      ['rest', 10],

      // rep 2
      ['exercise', 30],
      ['recovery', 50],

      ['coolDownInterval', 60],
    ])
  })
  it('works - no warmup', () => {
    const data: AppState = {
      initialCountdown: 3,
      warmup: 0,
      exercise: 30,
      rest: 10,
      recovery: 50,
      coolDownInterval: 60,
      numReps: 2,
      numSets: 2,
      currentState: 'stopped',
      currentRep: 1,
      currentSet: 1,
    }
    expect(createWorkflow(data)).toEqual([
      ['initialCountdown', 3],

      // SET 1:

      // rep 1
      ['exercise', 30],
      ['rest', 10],

      // rep 2
      ['exercise', 30],
      ['recovery', 50],

      // SET 2:

      // rep 1
      ['exercise', 30],
      ['rest', 10],

      // rep 2
      ['exercise', 30],
      ['recovery', 50],

      ['coolDownInterval', 60],
    ])
  })
  it('works - even with no exercise', () => {
    const data: AppState = {
      initialCountdown: 3,
      warmup: 120,
      exercise: 0,
      rest: 10,
      recovery: 50,
      coolDownInterval: 60,
      numReps: 2,
      numSets: 2,
      currentState: 'stopped',
      currentRep: 1,
      currentSet: 1,
    }
    expect(createWorkflow(data)).toEqual([
      ['initialCountdown', 3],
      ['warmup', 120],

      // SET 1:

      // rep 1
      ['rest', 10],

      // rep 2
      ['recovery', 50],

      // SET 2:

      // rep 1
      ['rest', 10],

      // rep 2
      ['recovery', 50],

      ['coolDownInterval', 60],
    ])
  })
  it('works - no rest', () => {
    const data: AppState = {
      initialCountdown: 3,
      warmup: 120,
      exercise: 30,
      rest: 0,
      recovery: 50,
      coolDownInterval: 60,
      numReps: 2,
      numSets: 2,
      currentState: 'stopped',
      currentRep: 1,
      currentSet: 1,
    }
    expect(createWorkflow(data)).toEqual([
      ['initialCountdown', 3],
      ['warmup', 120],

      // SET 1:

      // rep 1
      ['exercise', 30],

      // rep 2
      ['exercise', 30],
      ['recovery', 50],

      // SET 2:

      // rep 1
      ['exercise', 30],

      // rep 2
      ['exercise', 30],
      ['recovery', 50],

      ['coolDownInterval', 60],
    ])
  })
  it('works - no recov', () => {
    const data: AppState = {
      initialCountdown: 3,
      warmup: 120,
      exercise: 30,
      rest: 10,
      recovery: 0,
      coolDownInterval: 60,
      numReps: 2,
      numSets: 2,
      currentState: 'stopped',
      currentRep: 1,
      currentSet: 1,
    }
    expect(createWorkflow(data)).toEqual([
      ['initialCountdown', 3],
      ['warmup', 120],

      // SET 1:

      // rep 1
      ['exercise', 30],
      ['rest', 10],

      // rep 2
      ['exercise', 30],
      ['rest', 10],

      // SET 2:

      // rep 1
      ['exercise', 30],
      ['rest', 10],

      // rep 2
      ['exercise', 30],
      ['rest', 10],

      ['coolDownInterval', 60],
    ])
  })
  it('works - no cooldown', () => {
    const data: AppState = {
      initialCountdown: 3,
      warmup: 120,
      exercise: 30,
      rest: 10,
      recovery: 50,
      coolDownInterval: 0,
      numReps: 2,
      numSets: 2,
      currentState: 'stopped',
      currentRep: 1,
      currentSet: 1,
    }
    expect(createWorkflow(data)).toEqual([
      ['initialCountdown', 3],
      ['warmup', 120],

      // SET 1:

      // rep 1
      ['exercise', 30],
      ['rest', 10],

      // rep 2
      ['exercise', 30],
      ['recovery', 50],

      // SET 2:

      // rep 1
      ['exercise', 30],
      ['rest', 10],

      // rep 2
      ['exercise', 30],
      ['recovery', 50],
    ])
  })
})
