import { StyleSheet } from 'react-native'
import { Colors, Font } from 'theme'

export const formStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 20,
    color: Colors.textDefault,
    fontWeight: Font.weightNormal,
    marginBottom: 50,
  },
  label: {
    fontSize: 16,
    lineHeight: 19,
    color: Colors.textDefault,
    fontWeight: Font.weightNormal,
    marginBottom: 10,
  },
  input: {
    color: '#ccc',
    backgroundColor: '#333',
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 60,
  },
  button: {
    color: Colors.background,
    fontSize: 16,
    lineHeight: 19,
    fontWeight: Font.weightBold,
    backgroundColor: Colors.textOrange,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  buttonSep: {
    width: 20,
  },
})
