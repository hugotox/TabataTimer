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
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { View, Text } from 'react-native'
import { RootStackParamList } from 'routes/rootStackParamList'
import { start, pause, stop } from 'store/actions'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  selectNumIntervals,
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
import { loadSounds, unLoadSounds } from 'utils/sounds'

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
  const totalDuration = useAppSelector(selectTotalDuration)
  const customNames = useAppSelector(selectCustomNames)

  const [currentWorkflowItem, setCurrentWorkflowItem] = useState<number>(-1)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [currentTotalTime, setCurrentTotalTime] = useState<number>(0)

  const isPlaying = currentState === 'playing'
  const isPaused = currentState === 'paused'
  const isStopped = currentState === 'stopped'

  const beepSound = useRef<Audio.Sound>()
  const bellSound = useRef<Audio.Sound>()
  const startSound = useRef<Audio.Sound>()

  const { currentInterval, currentCycle } = workflow[currentWorkflowItem] || {}

  const { current: currentWorkoutLabel, next: nextWorkoutLabel } =
    useMemo(() => {
      return getCurrentWorkoutLabel({
        workflow,
        customNames,
        currentInterval,
        numIntervals,
        currentWorkflowItem,
      })
    }, [
      currentInterval,
      currentWorkflowItem,
      customNames,
      numIntervals,
      workflow,
    ])

  const init = useCallback(() => {
    if (workflow.length) {
      const initialTime = workflow[0].duration
      setCurrentWorkflowItem(0)
      setCurrentTotalTime(totalDuration)
      setCurrentTime(initialTime)
    }
  }, [workflow, totalDuration])

  const moveNext = useCallback(
    ({
      nextIndex,
      updateTotalTime = false,
    }: {
      nextIndex: number
      updateTotalTime?: boolean
    }) => {
      // bail for case when tap "next" but is the last item
      if (!workflow[nextIndex]?.currentState) {
        return
      }

      if (workflow[nextIndex].currentState === 'exercise') {
        startSound.current?.replayAsync()
      } else {
        bellSound.current?.replayAsync()
      }

      setCurrentWorkflowItem(nextIndex)
      setCurrentTime(workflow[nextIndex].duration)

      if (updateTotalTime) {
        const workSlice = workflow.slice(nextIndex)
        setCurrentTotalTime(
          workSlice.reduce((acc, item) => acc + item.duration, 0)
        )
      }
    },
    [bellSound, startSound, workflow]
  )

  useKeepAwake()

  useMount(() => {
    // allows timer to sound when screen is off
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
    })
  })

  useEffect(() => {
    const callLoadSounds = async () => {
      const sounds = await loadSounds()
      beepSound.current = sounds.beepSound
      bellSound.current = sounds.bellSound
      startSound.current = sounds.startSound
    }
    callLoadSounds()
    return () => {
      unLoadSounds()
    }
  }, [])

  useInterval(
    () => {
      const { currentState } = workflow[currentWorkflowItem]
      if (currentTime > 1) {
        setCurrentTime(currentTime - 1)
        if (
          currentTime <= 4 &&
          currentState !== 'exercise' &&
          currentState !== 'cooldownInterval'
        ) {
          beepSound.current?.replayAsync()
        }
      } else {
        if (currentWorkflowItem < workflow.length - 1) {
          // advance to next workflow item:
          moveNext({ nextIndex: currentWorkflowItem + 1 })
        } else {
          // reached the end of the workflow
          setCurrentWorkflowItem(-1)
          dispatch(stop())
        }
        if (currentState === 'cooldownInterval') {
          bellSound.current?.replayAsync()
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

  const handleOnPressPrevious = useCallback(() => {
    if (typeof workflow[currentWorkflowItem]?.duration !== 'undefined') {
      // if time elapsed is 3 or less, move to previous, otherwise reset current
      const timeElapsed =
        workflow[currentWorkflowItem].duration - currentTime + 1
      if (timeElapsed <= 3 && currentWorkflowItem > 0) {
        // move to previous
        moveNext({ nextIndex: currentWorkflowItem - 1, updateTotalTime: true })
      } else {
        // reset current
        moveNext({ nextIndex: currentWorkflowItem, updateTotalTime: true })
      }
    }
  }, [currentTime, currentWorkflowItem, moveNext, workflow])

  const handleOnPressNext = useCallback(() => {
    moveNext({ nextIndex: currentWorkflowItem + 1, updateTotalTime: true })
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
              <CurrentWorkout
                label={currentWorkoutLabel}
                next={nextWorkoutLabel}
                color={color}
              />
              <Timer
                currentTime={currentTime}
                currentStepDuration={
                  workflow[currentWorkflowItem]?.duration ?? 0
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
