import { Ionicons } from '@expo/vector-icons'
import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import { Timer } from 'components/Timer'
import { useFonts } from 'expo-font'
import React, { useMemo } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { RootStackParamList } from 'routes/rootStackParamList'
import { start, pause, stop } from 'store/actions'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { getCurrentStateLabel } from 'utils'

export type MainNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>
export type MainRouteProp = RouteProp<RootStackParamList, 'Main'>

interface MainProps {
  navigation: MainNavigationProp
}

export const Main = ({ navigation }: MainProps) => {
  const [fontsLoaded] = useFonts({
    Impact: require('assets/fonts/Impact.ttf'),
  })
  const dispatch = useAppDispatch()
  const currentState = useAppSelector((state) => state.currentState)

  const isPlaying = useMemo(() => {
    return currentState !== 'completed' && currentState !== 'stopped'
  }, [currentState])

  const gotoSettings = () => {
    navigation.navigate('Settings')
  }

  const togglePlay = () => {
    if (isPlaying && currentState !== 'paused') {
      dispatch(pause())
    } else {
      dispatch(start())
    }
  }

  const handleStop = () => {
    dispatch(stop())
  }

  return (
    <View style={style.container}>
      {fontsLoaded && (
        <>
          <View style={style.mainArea}>
            {currentState === 'stopped' && (
              <Text style={style.playText}>Press Play to start</Text>
            )}
            {isPlaying && (
              <>
                <Text>{getCurrentStateLabel(currentState)}</Text>
                <Timer />
              </>
            )}
          </View>
          <View style={style.buttons}>
            <View>
              <TouchableOpacity onPress={togglePlay} activeOpacity={0.5}>
                <Ionicons
                  name={
                    currentState === 'stopped'
                      ? 'play-circle-outline'
                      : 'pause-circle-outline'
                  }
                  size={45}
                  color="#dcebfd"
                />
              </TouchableOpacity>
            </View>
            <View style={style.buttonsRight}>
              <TouchableOpacity onPress={handleStop} activeOpacity={0.5}>
                <Ionicons
                  name="stop-circle-outline"
                  size={45}
                  color="#c8ddee"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={gotoSettings}
                activeOpacity={0.5}
                style={style.gearButton}
              >
                <Ionicons name="settings-outline" size={41} color="#c8ddee" />
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
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
  timerText: {
    fontSize: 30,
  },
  buttons: {
    backgroundColor: '#28313d',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  buttonsRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gearButton: {
    marginLeft: 10,
  },
})
