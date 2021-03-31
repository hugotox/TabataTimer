import { toTimeObject } from 'utils'

describe('toTimeObject', () => {
  it('works', () => {
    expect(toTimeObject(0)).toEqual({ hours: 0, minutes: 0, seconds: 0 })
    expect(toTimeObject(35)).toEqual({ hours: 0, minutes: 0, seconds: 35 })
    expect(toTimeObject(60)).toEqual({ hours: 0, minutes: 1, seconds: 0 })
    expect(toTimeObject(90)).toEqual({ hours: 0, minutes: 1, seconds: 30 })
    expect(toTimeObject(3600)).toEqual({ hours: 1, minutes: 0, seconds: 0 })
    expect(toTimeObject(3660)).toEqual({ hours: 1, minutes: 1, seconds: 0 })
    expect(toTimeObject(3670)).toEqual({ hours: 1, minutes: 1, seconds: 10 })
  })
})
