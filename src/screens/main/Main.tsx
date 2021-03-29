import { FontAwesome, AntDesign } from '@expo/vector-icons'
import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler'
import { RootStackParamList } from 'routes/rootStackParamList'

export type MainNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>
export type MainRouteProp = RouteProp<RootStackParamList, 'Main'>

interface MainProps {
  navigation: MainNavigationProp
}

type Status = 'playing' | 'stopped'

export const Main = ({ navigation }: MainProps) => {
  const [status, setStatus] = useState<Status>('stopped')

  const gotoSettings = () => {
    navigation.navigate('Settings')
  }

  const play = () => {
    //
  }

  return (
    <View style={style.container}>
      <View style={style.mainArea}>
        {status === 'stopped' && (
          <Text style={style.playText}>Press Play to start</Text>
        )}
      </View>
      <View style={style.buttons}>
        <View>
          <TouchableOpacity onPress={play} activeOpacity={0.5}>
            <AntDesign name="playcircleo" size={45} color="#dcebfd" />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={gotoSettings} activeOpacity={0.5}>
            <FontAwesome name="gear" size={45} color="#c8ddee" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#192433',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  mainArea: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  playText: {
    color: '#aaa',
    fontSize: 32,
  },
  buttons: {
    backgroundColor: '#28313d',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
})
