import { Colors } from 'theme'

export const getTimerColor = (currentTime: number) => {
  let color = Colors.textGreen
  if (currentTime <= 5) {
    color = Colors.textRed
  } else if (currentTime <= 10) {
    color = Colors.textYellow
  }
  return color
}
