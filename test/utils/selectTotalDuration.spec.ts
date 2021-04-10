import { selectTotalDuration } from 'store/selectors'
import { AppState } from 'store/slice'

describe('selectTotalDuration', () => {
  it('test 1 set 1 cycle', () => {
    const data: AppState = {
      initialCountdown: 10,
      warmup: 10,
      exercise: 10,
      rest: 10,
      numReps: 1,
      recovery: 10,
      numSets: 1,
      coolDownInterval: 10,
      currentState: 'playing',
      currentRep: 1,
      currentSet: 1,
    }
    expect(selectTotalDuration(data)).toEqual(50)
  })
  it('test 2 sets 1 cycle', () => {
    const data: AppState = {
      initialCountdown: 10,
      warmup: 10,
      exercise: 10,
      rest: 10,
      numReps: 2,
      recovery: 10,
      numSets: 1,
      coolDownInterval: 10,
      currentState: 'playing',
      currentRep: 1,
      currentSet: 1,
    }
    expect(selectTotalDuration(data)).toEqual(70)
  })
  it('test 2 sets 2 cycles', () => {
    const data: AppState = {
      initialCountdown: 10,
      warmup: 10,
      exercise: 10,
      rest: 10,
      numReps: 2,
      recovery: 10,
      numSets: 2,
      coolDownInterval: 10,
      currentState: 'playing',
      currentRep: 1,
      currentSet: 1,
    }
    expect(selectTotalDuration(data)).toEqual(110)
  })
})
