import { StyleSheet } from 'react-native'
import { Colors, Font } from 'theme'

export const styles = StyleSheet.create({
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  icon: {
    width: 35,
    fontSize: 22,
    lineHeight: 24,
  },
  inlineText: {
    flexDirection: 'row',
  },
  item: {
    paddingLeft: 0,
    paddingRight: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.separator,
    minHeight: 50,
  },
  text: {
    fontSize: 16,
    lineHeight: 19,
    color: Colors.textDefault,
    fontWeight: Font.weightNormal,
  },
  textEmphasis: {
    fontSize: 16,
    lineHeight: 19,
    color: Colors.textDefault,
    fontWeight: Font.weightBold,
    fontStyle: 'italic',
  },
  textSmall: {
    fontSize: 12,
    marginTop: 2,
    color: Colors.textDefault,
    fontWeight: Font.weightNormal,
  },
})
