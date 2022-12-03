import { TextStyle, StyleSheet } from 'react-native'

export const Colors = {
  background: '#1b1b1b',
  separator: '#303030',
  textDefault: '#ffffff',
  textRed: '#f82d2d',
  textYellow: 'yellow',
  textOrange: 'orange',
  textBlue: '#0099ff',
  textLightBlue: '#92d2e0',
  textGreen: '#00ff00',
  iconColor: '#cf943a',
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
  rest: {
    color: Colors.textLightBlue,
  },
  recovery: {
    color: Colors.textBlue,
  },
  cooldown: {
    color: Colors.textLightBlue,
  },
})
