import { getTotalDuration } from 'utils'

describe('getTotalDuration', () => {
  it('test 1 set 1 cycle', () => {
    const data = {
      initialCountdown: 10,
      warmup: 10,
      exercise: 10,
      rest: 10,
      numSets: 1,
      recovery: 10,
      numCycles: 1,
      coolDownInterval: 10,
    }
    expect(getTotalDuration(data)).toEqual(60)
  })
  it('test 2 sets 1 cycle', () => {
    const data = {
      initialCountdown: 10,
      warmup: 10,
      exercise: 10,
      rest: 10,
      numSets: 2,
      recovery: 10,
      numCycles: 1,
      coolDownInterval: 10,
    }
    expect(getTotalDuration(data)).toEqual(80)
  })
  it('test 2 sets 2 cycles', () => {
    const data = {
      initialCountdown: 10,
      warmup: 10,
      exercise: 10,
      rest: 10,
      numSets: 2,
      recovery: 10,
      numCycles: 2,
      coolDownInterval: 10,
    }
    expect(getTotalDuration(data)).toEqual(130)
  })
})
