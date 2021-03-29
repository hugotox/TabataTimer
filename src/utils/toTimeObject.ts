export const toTimeObject = (seconds: number) => {
  const time = {
    minutes: Math.floor(seconds / 60),
    seconds: seconds % 60,
  }
  return time
}
