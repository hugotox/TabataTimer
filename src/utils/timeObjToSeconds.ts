import { TimeObject } from 'components/TimeInput'

export const timeObjToSeconds = (time: TimeObject) => {
  return time.minutes * 60 + time.seconds
}
