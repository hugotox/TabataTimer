import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import { Background } from 'components/Background/Background'
import { ButtonBar } from 'components/ButtonBar'
import { CurrentWorkout } from 'components/CurrentWorkout'
import { ScheduleInfo } from 'components/ScheduleInfo'
import { Timer } from 'components/Timer'
import { WorkoutStatus } from 'components/WorkoutStatus'
import { useFonts } from 'expo-font'
import React, { useCallback, useMemo, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RootStackParamList } from 'routes/rootStackParamList'
import { start, pause, stop } from 'store/actions'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  selectNumReps,
  selectNumSets,
  selectTotalDuration,
  selectWorkflow,
  selectCurrentState,
} from 'store/selectors'
import { Colors, Font } from 'themeConstants'
import { useInterval, getCurrentWorkoutLabel, useSound } from 'utils'

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
  const currentState = useAppSelector(selectCurrentState)
  const workflow = useAppSelector(selectWorkflow)
  const numReps = useAppSelector(selectNumReps)
  const numSets = useAppSelector(selectNumSets)
  const totalDuration = useAppSelector(selectTotalDuration)

  const [currentWorkflowItem, setCurrentWorkflowItem] = useState<number>(-1)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [currentTotalTime, setCurrentTotalTime] = useState<number>(0)
  const [currentRep, setCurrentRep] = useState<number>(numReps)
  const [currentSet, setCurrentSet] = useState<number>(numSets)

  const playBeep = useSound('beep')
  const playStart = useSound('start')
  const playBell = useSound('bell')

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
      setCurrentTotalTime(totalDuration)
      setCurrentTime(initialTime)
      setCurrentRep(numReps)
      setCurrentSet(numSets)
    }
  }, [numReps, numSets, workflow, totalDuration])

  const updateReps = useCallback(
    (nextIndex: number) => {
      if (nextIndex > 0 && workflow[currentWorkflowItem][0] === 'exercise') {
        if (currentRep > 0) {
          setCurrentRep(currentRep - 1)
          if (currentRep - 1 === 0) {
            setCurrentSet(currentSet - 1)
            if (currentSet - 1 > 0) {
              setCurrentRep(numReps)
            }
          }
        } else {
          setCurrentRep(numReps)
          setCurrentSet(currentSet - 1)
        }
      }
    },
    [currentRep, currentSet, currentWorkflowItem, numReps, workflow]
  )

  const moveNext = () => {
    const nextIndex = currentWorkflowItem + 1

    if (workflow[nextIndex][0] === 'exercise') {
      playStart()
    } else {
      playBell()
    }

    updateReps(nextIndex)
    setCurrentWorkflowItem(nextIndex)
    setCurrentTime(workflow[nextIndex][1])

    // TODO update setCurrentTotalTime
  }

  const movePrevious = () => {
    // TODO
  }

  useInterval(
    () => {
      if (currentTime > 1) {
        setCurrentTime(currentTime - 1)
        if (currentTime <= 4) {
          playBeep()
        }
      } else {
        if (currentWorkflowItem < workflow.length - 1) {
          // advance to next workflow item:
          moveNext()
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
                <ScheduleInfo />
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
            onPressNext={moveNext}
            onPressPrevious={movePrevious}
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
