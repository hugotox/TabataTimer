export const toTimeObject = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600)
  totalSeconds %= 3600
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  const time = {
    hours,
    minutes,
    seconds,
  }
  return time
}
