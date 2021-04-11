import { StyleSheet } from 'react-native'
import { Colors, Font } from 'themeConstants'

export const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  stoppedArea: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  playingArea: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  separator: {
    borderBottomColor: Colors.separator,
    borderBottomWidth: 1,
    alignSelf: 'stretch',
  },
  playText: {
    color: Colors.textDefault,
    fontWeight: Font.weightNormal,
    fontSize: 32,
    marginBottom: 30,
  },
  info: {
    alignSelf: 'flex-end',
    marginRight: 25,
  },
})
