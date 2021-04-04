import { TextStyle } from 'react-native'

export const Colors = {
  background: '#202020',
  separator: '#303030',
  textDefault: '#ffffff',
  textRed: 'red',
}

interface IFont {
  weightNormal: TextStyle['fontWeight']
  weightBold: TextStyle['fontWeight']
}

export const Font: IFont = {
  weightNormal: '300',
  weightBold: '600',
}
