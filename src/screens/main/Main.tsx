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
import { useKeepAwake } from 'expo-keep-awake'
import React, { useCallback, useMemo, useState } from 'react'
import { View, Text } from 'react-native'
import { RootStackParamList } from 'routes/rootStackParamList'
import { start, pause, stop } from 'store/actions'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  selectNumIntervals,
  selectNumCycles,
  selectTotalDuration,
  selectWorkflow,
  selectCurrentState,
  selectCustomNames,
} from 'store/selectors'
import {
  useInterval,
  getCurrentWorkoutLabel,
  useOrientation,
  useMount,
} from 'utils'
import { getTimerColor } from 'utils/getTimerColor'
import { useSounds } from 'utils/sounds'

import { styles } from './styles'

export type MainNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>
export type MainRouteProp = RouteProp<RootStackParamList, 'Main'>

interface MainProps {
  navigation: MainNavigationProp
}

export const Main = ({ navigation }: MainProps) => {
  const [fontsLoaded] = useFonts({
    monofonto: require('assets/fonts/monofonto.ttf'),
  })
  const orientation = useOrientation()
  const dispatch = useAppDispatch()
  const currentState = useAppSelector(selectCurrentState)
  const workflow = useAppSelector(selectWorkflow)
  const numIntervals = useAppSelector(selectNumIntervals)
  const numCycles = useAppSelector(selectNumCycles)
  const totalDuration = useAppSelector(selectTotalDuration)
  const customNames = useAppSelector(selectCustomNames)

  const [currentWorkflowItem, setCurrentWorkflowItem] = useState<number>(-1)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [currentTotalTime, setCurrentTotalTime] = useState<number>(0)
  const [currentInterval, setCurrentInterval] = useState<number>(numIntervals)
  const [currentCycle, setCurrentCycle] = useState<number>(numCycles)

  const isPlaying = currentState === 'playing'
  const isPaused = currentState === 'paused'
  const isStopped = currentState === 'stopped'
  const isActive = isPlaying || isPaused
  const { beepSound, bellSound, startSound } = useSounds(isActive)

  const currentWorkoutLabel = useMemo(() => {
    if (
      workflow.length &&
      currentWorkflowItem >= 0 &&
      workflow[currentWorkflowItem]?.[0]
    ) {
      return getCurrentWorkoutLabel({
        state: workflow[currentWorkflowItem][0],
        customNames,
        currentInterval,
        numIntervals,
      })
    } else {
      return ''
    }
  }, [
    workflow,
    currentWorkflowItem,
    customNames,
    currentInterval,
    numIntervals,
  ])

  const init = useCallback(() => {
    if (workflow.length) {
      const initialTime = workflow[0][1]
      setCurrentWorkflowItem(0)
      setCurrentTotalTime(totalDuration)
      setCurrentTime(initialTime)
      setCurrentInterval(numIntervals)
      setCurrentCycle(numCycles)
    }
  }, [numIntervals, numCycles, workflow, totalDuration])

  const updateCycles = useCallback(
    (nextIndex: number) => {
      if (nextIndex > 0 && workflow[currentWorkflowItem][0] === 'exercise') {
        if (currentInterval > 0) {
          setCurrentInterval(currentInterval - 1)
          if (currentInterval - 1 === 0) {
            setCurrentCycle(currentCycle - 1)
            if (currentCycle - 1 > 0) {
              setCurrentInterval(numIntervals)
            }
          }
        } else {
          setCurrentInterval(numIntervals)
          setCurrentCycle(currentCycle - 1)
        }
      }
    },
    [currentInterval, currentCycle, currentWorkflowItem, numIntervals, workflow]
  )

  const moveNext = useCallback(
    (nextIndex: number, updateTotalTime: boolean = false) => {
      // bail for case when tap "next" but is the last item
      if (!workflow[nextIndex]?.[0]) {
        return
      }

      if (workflow[nextIndex][0] === 'exercise') {
        startSound?.replayAsync()
      } else {
        bellSound?.replayAsync()
      }

      updateCycles(nextIndex)
      setCurrentWorkflowItem(nextIndex)
      setCurrentTime(workflow[nextIndex][1])

      if (updateTotalTime) {
        const workSlice = workflow.slice(nextIndex)
        setCurrentTotalTime(workSlice.reduce((acc, item) => acc + item[1], 0))
      }
    },
    [bellSound, startSound, updateCycles, workflow]
  )

  const handleOnPressPrevious = useCallback(() => {
    if (typeof workflow[currentWorkflowItem]?.[1] !== 'undefined') {
      // if time elapsed is 3 or less, move to previous, otherwise reset current
      const timeElapsed = workflow[currentWorkflowItem][1] - currentTime + 1
      if (timeElapsed <= 3 && currentWorkflowItem > 0) {
        // move to previous
        moveNext(currentWorkflowItem - 1, true)
      } else {
        // reset current
        moveNext(currentWorkflowItem, true)
      }
    }
  }, [currentTime, currentWorkflowItem, moveNext, workflow])

  useKeepAwake()

  useMount(() => {
    // allows timer to sound when screen is off
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
    })
  })

  useInterval(
    () => {
      if (currentTime > 1) {
        setCurrentTime(currentTime - 1)
        if (
          currentTime <= 4 &&
          workflow[currentWorkflowItem][0] !== 'exercise'
        ) {
          beepSound?.replayAsync()
        }
      } else {
        if (currentWorkflowItem < workflow.length - 1) {
          // advance to next workflow item:
          moveNext(currentWorkflowItem + 1)
        } else {
          // reached the end of the workflow
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

  const handleOnPressPlay = useCallback(() => {
    if (isPlaying) {
      dispatch(pause())
    } else {
      if (workflow.length && isStopped) {
        init()
      }
      // if its paused, just come back to play:
      dispatch(start())
    }
  }, [dispatch, init, isPlaying, isStopped, workflow.length])

  const handleOnPressStop = useCallback(() => {
    dispatch(stop())
  }, [dispatch])

  const handleOnPressNext = useCallback(() => {
    moveNext(currentWorkflowItem + 1, true)
  }, [currentWorkflowItem, moveNext])

  const handleOnPressSettings = useCallback(() => {
    navigation.navigate('Settings')
  }, [navigation])

  const color = getTimerColor(currentTime)

  return (
    <View
      style={
        orientation === 'portrait'
          ? styles.container
          : styles.landScapeContainer
      }
    >
      <Background />
      {fontsLoaded && (
        <>
          {isStopped && (
            <View style={styles.stoppedArea}>
              <Text style={styles.playText}>Press Play to start</Text>
              <View style={styles.info}>
                <ScheduleInfo />
              </View>
            </View>
          )}
          {(isPlaying || isPaused) && (
            <View
              style={
                orientation === 'portrait'
                  ? styles.playingArea
                  : styles.playingAreaLandScape
              }
            >
              <CurrentWorkout label={currentWorkoutLabel} color={color} />
              <Timer
                currentTime={currentTime}
                currentStepDuration={
                  typeof workflow[currentWorkflowItem]?.[1] !== 'undefined'
                    ? workflow[currentWorkflowItem][1]
                    : 0
                }
                color={color}
                label={currentWorkoutLabel}
                onPressPlay={handleOnPressPlay}
              />
              <WorkoutStatus
                timeLeft={currentTotalTime}
                intervals={currentInterval}
                cycles={currentCycle}
              />
            </View>
          )}
          <ButtonBar
            currentState={currentState}
            onPressPlay={handleOnPressPlay}
            onPressStop={handleOnPressStop}
            onPressSettings={handleOnPressSettings}
            onPressNext={handleOnPressNext}
            onPressPrevious={handleOnPressPrevious}
            orientation={orientation}
          />
        </>
      )}
    </View>
  )
}
