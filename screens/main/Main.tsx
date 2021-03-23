import { FontAwesome5, FontAwesome, Ionicons } from '@expo/vector-icons'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'

interface MainProps {
  navigation: StackNavigationProp<any>
}

export const Main = ({ navigation }: MainProps) => {
  const gotoSettings = () => {
    navigation.navigate('Settings')
  }

  return (
    <View style={style.container}>
      <Text>yo</Text>
      <View style={style.buttons}>
        <View>
          <Ionicons name="md-play" size={45} color="black" />
        </View>
        <View>
          <TouchableHighlight onPress={gotoSettings}>
            <FontAwesome name="gear" size={45} color="black" />
          </TouchableHighlight>
        </View>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#813f74',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  buttons: {
    height: 75,
    backgroundColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
})
