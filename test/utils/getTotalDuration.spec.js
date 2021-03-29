import { getTotalDuration } from 'utils'

describe('getTotalDuration', () => {
  it('test 1 set 1 cycle', () => {
    const data = {
      initialCountdown: { minutes: 0, seconds: 10 },
      warmup: { minutes: 0, seconds: 10 },
      exercise: { minutes: 0, seconds: 10 },
      rest: { minutes: 0, seconds: 10 },
      numSets: 1,
      recovery: { minutes: 0, seconds: 10 },
      numCycles: 1,
      coolDownInterval: { minutes: 0, seconds: 10 },
    }
    expect(getTotalDuration(data)).toEqual(60)
  })
  it('test 2 sets 1 cycle', () => {
    const data = {
      initialCountdown: { minutes: 0, seconds: 10 },
      warmup: { minutes: 0, seconds: 10 },
      exercise: { minutes: 0, seconds: 10 },
      rest: { minutes: 0, seconds: 10 },
      numSets: 2,
      recovery: { minutes: 0, seconds: 10 },
      numCycles: 1,
      coolDownInterval: { minutes: 0, seconds: 10 },
    }
    expect(getTotalDuration(data)).toEqual(80)
  })
  it('test 2 sets 2 cycles', () => {
    const data = {
      initialCountdown: { minutes: 0, seconds: 10 },
      warmup: { minutes: 0, seconds: 10 },
      exercise: { minutes: 0, seconds: 10 },
      rest: { minutes: 0, seconds: 10 },
      numSets: 2,
      recovery: { minutes: 0, seconds: 10 },
      numCycles: 2,
      coolDownInterval: { minutes: 0, seconds: 10 },
    }
    expect(getTotalDuration(data)).toEqual(130)
  })
})
