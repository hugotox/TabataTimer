import { Ionicons } from '@expo/vector-icons'
import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import { Timer } from 'components/Timer'
import { useFonts } from 'expo-font'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { RootStackParamList } from 'routes/rootStackParamList'
import { start, pause, stop } from 'store/actions'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { createWorkflow, WorkflowItem, getTimeDurationLabel } from 'utils'

export type MainNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>
export type MainRouteProp = RouteProp<RootStackParamList, 'Main'>

interface MainProps {
  navigation: MainNavigationProp
}

export const Main = ({ navigation }: MainProps) => {
  const [fontsLoaded] = useFonts({
    calculator: require('assets/fonts/calculator.ttf'),
  })
  const dispatch = useAppDispatch()
  const data = useAppSelector((state) => state)
  const [workflow, setWorkflow] = useState<WorkflowItem[]>([])

  const { currentState } = data
  const isPlaying = currentState === 'playing'
  const isPaused = currentState === 'paused'
  const isStopped = currentState === 'stopped'

  const gotoSettings = () => {
    navigation.navigate('Settings')
  }

  const handleOnPressPlay = () => {
    if (isPlaying) {
      dispatch(pause())
    } else {
      dispatch(start())
    }
  }

  const handleStop = () => {
    dispatch(stop())
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setWorkflow(createWorkflow(data))
    })

    return unsubscribe
  }, [navigation, data])

  return (
    <View style={style.container}>
      {fontsLoaded && (
        <>
          <View style={style.mainArea}>
            {isStopped && (
              <>
                <Text style={style.playText}>Press Play to start</Text>
                <Text style={style.schedule}>
                  Workout schedule:{'\n'}
                  Countdown: {getTimeDurationLabel(data.initialCountdown)}
                  {'\n'}
                  Warmup: {getTimeDurationLabel(data.warmup)}
                  {'\n'}
                  Exercise: {getTimeDurationLabel(data.exercise)}
                  {'\n'}
                  Rest: {getTimeDurationLabel(data.rest)}
                  {'\n'}
                  Reps: {data.numReps}
                  {'\n'}
                  Recovery: {getTimeDurationLabel(data.recovery)}
                  {'\n'}
                  Sets: {data.numSets}
                  {'\n'}
                  Cooldown: {getTimeDurationLabel(data.coolDownInterval)}
                  {'\n'}
                </Text>
              </>
            )}
            {(isPlaying || isPaused) && <Timer workflow={workflow} />}
          </View>
          <View style={style.buttons}>
            <View>
              <TouchableOpacity onPress={handleOnPressPlay} activeOpacity={0.5}>
                <Ionicons
                  name={
                    currentState !== 'playing'
                      ? 'play-circle-outline'
                      : 'pause-circle-outline'
                  }
                  size={45}
                  color={ICON_COLOR}
                />
              </TouchableOpacity>
            </View>
            <View style={style.buttonsRight}>
              {currentState === 'stopped' ? (
                <TouchableOpacity onPress={gotoSettings} activeOpacity={0.5}>
                  <Ionicons
                    name="settings-outline"
                    size={41}
                    color={ICON_COLOR}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={handleStop} activeOpacity={0.5}>
                  <Ionicons
                    name="stop-circle-outline"
                    size={45}
                    color={ICON_COLOR}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </>
      )}
    </View>
  )
}

const ICON_COLOR = '#d5ecff'

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e232b',
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
  schedule: {
    color: '#fff',
  },
  buttons: {
    backgroundColor: '#28313d',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  buttonsRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
