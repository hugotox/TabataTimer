import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import { Background } from 'components/Background/Background'
import { ButtonBar } from 'components/ButtonBar'
import { CurrentWorkout } from 'components/CurrentWorkout'
import { ScheduleInfo } from 'components/ScheduleInfo'
import { Timer } from 'components/Timer'
import { WorkoutStatus } from 'components/WorkoutStatus'
import { Audio } from 'expo-av'
import { useFonts } from 'expo-font'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RootStackParamList } from 'routes/rootStackParamList'
import { start, pause, stop } from 'store/actions'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { Colors, Font } from 'themeConstants'
import {
  createWorkflow,
  WorkflowItem,
  useInterval,
  getCurrentWorkoutLabel,
  getTotalDuration,
} from 'utils'

export type MainNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>
export type MainRouteProp = RouteProp<RootStackParamList, 'Main'>

interface MainProps {
  navigation: MainNavigationProp
}

export const Main = ({ navigation }: MainProps) => {
  const [fontsLoaded] = useFonts({
    digital: require('assets/fonts/digital.otf'),
  })
  const dispatch = useAppDispatch()
  const data = useAppSelector((state) => state)
  const [workflow, setWorkflow] = useState<WorkflowItem[]>([])
  const [currentWorkflowItem, setCurrentWorkflowItem] = useState<number>(-1)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [currentTotalTime, setCurrentTotalTime] = useState<number>(0)
  const [currentRep, setCurrentRep] = useState<number>(data.numReps)
  const [currentSet, setCurrentSet] = useState<number>(data.numSets)

  const [sound, setSound] = useState<Audio.Sound>()

  const { currentState } = data
  const isPlaying = currentState === 'playing'
  const isPaused = currentState === 'paused'
  const isStopped = currentState === 'stopped'

  const currentWorkoutLabel = useMemo(() => {
    if (workflow.length && currentWorkflowItem >= 0) {
      return getCurrentWorkoutLabel(workflow[currentWorkflowItem][0])
    } else {
      return ''
    }
  }, [currentWorkflowItem, workflow])

  const init = useCallback(() => {
    if (workflow.length) {
      const initialTime = workflow[0][1]
      setCurrentWorkflowItem(0)
      setCurrentTotalTime(getTotalDuration(data))
      setCurrentTime(initialTime)
      setCurrentRep(data.numReps)
      setCurrentSet(data.numSets)
    }
  }, [data, workflow])

  const updateReps = useCallback(
    (nextIndex: number) => {
      if (nextIndex > 0 && workflow[currentWorkflowItem][0] === 'exercise') {
        if (currentRep > 0) {
          setCurrentRep(currentRep - 1)
          if (currentRep - 1 === 0) {
            setCurrentSet(currentSet - 1)
            if (currentSet - 1 > 0) {
              setCurrentRep(data.numReps)
            }
          }
        } else {
          setCurrentRep(data.numReps)
          setCurrentSet(currentSet - 1)
        }
      }
    },
    [currentRep, currentSet, currentWorkflowItem, data.numReps, workflow]
  )

  const playSound = async () => {
    console.log('Loading Sound')
    const { sound } = await Audio.Sound.createAsync(
      require('assets/sounds/beep.mp3')
    )
    setSound(sound)

    console.log('Playing Sound')
    await sound.playAsync()
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound')
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setWorkflow(createWorkflow(data))
      init()
    })
    return unsubscribe
  }, [navigation, data, init])

  useInterval(
    () => {
      if (currentTime > 1) {
        setCurrentTime(currentTime - 1)
        if (currentTime <= 4) {
          playSound()
        }
      } else {
        if (currentWorkflowItem < workflow.length - 1) {
          // advance to next workflow item:
          const nextIndex = currentWorkflowItem + 1
          updateReps(nextIndex)
          setCurrentWorkflowItem(nextIndex)
          setCurrentTime(workflow[nextIndex][1])
        } else {
          setCurrentWorkflowItem(-1)
          dispatch(stop())
        }
      }
      if (currentTotalTime > 0) {
        setCurrentTotalTime(currentTotalTime - 1)
      }
    },
    !isPlaying ? null : 1000
  )

  const handleOnPressPlay = () => {
    if (isPlaying) {
      dispatch(pause())
    } else {
      if (workflow.length && isStopped) {
        init()
      }
      // if its paused, just come back to play:
      dispatch(start())
    }
  }

  return (
    <SafeAreaView style={style.container}>
      <Background />
      {fontsLoaded && (
        <>
          {isStopped && (
            <View style={style.stoppedArea}>
              <Text style={style.playText}>Press Play to start</Text>
              <View style={style.info}>
                <ScheduleInfo data={data} />
              </View>
            </View>
          )}
          {(isPlaying || isPaused) && (
            <View style={style.playingArea}>
              <CurrentWorkout label={currentWorkoutLabel} />
              <View>
                <Timer currentTime={currentTime} label={currentWorkoutLabel} />
                <View style={style.separator} />
              </View>
              <WorkoutStatus
                timeLeft={currentTotalTime}
                reps={currentRep}
                sets={currentSet}
              />
            </View>
          )}
          <ButtonBar
            currentState={currentState}
            onPressPlay={handleOnPressPlay}
            onPressStop={() => dispatch(stop())}
            onPressSettings={() => navigation.navigate('Settings')}
          />
        </>
      )}
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
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
