import { TextStyle, StyleSheet } from 'react-native'

export const Colors = {
  background: '#101010',
  separator: '#303030',
  textDefault: '#ffffff',
  textRed: 'red',
  textYellow: 'yellow',
  textOrange: 'orange',
  textBlue: '#0099ff',
  textLightBlue: '#92d2e0',
  textGreen: '#00ff00',
}

interface IFont {
  weightNormal: TextStyle['fontWeight']
  weightBold: TextStyle['fontWeight']
}

export const Font: IFont = {
  weightNormal: '300',
  weightBold: '600',
}

export const workoutStyles = StyleSheet.create({
  countdown: {
    color: Colors.textLightBlue,
  },
  warmup: {
    color: Colors.textYellow,
  },
  exercise: {
    color: Colors.textRed,
  },
  rest: {
    color: Colors.textGreen,
  },
  recovery: {
    color: Colors.textBlue,
  },
  cooldown: {
    color: Colors.textLightBlue,
  },
})
