import { TimeObject } from 'components/TimeInput'

export const toTimeObject = (seconds: number) => {
  const time: TimeObject = {
    minutes: Math.floor(seconds / 60),
    seconds: seconds % 60,
  }
  return time
}
