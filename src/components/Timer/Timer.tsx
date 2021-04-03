import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import { stop } from 'store/actions'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  createWorkflow,
  formatTimeObject,
  getCurrentWorkoutLabel,
  isPortrait,
  toTimeObject,
  useInterval,
  useMount,
  WorkflowItem,
} from 'utils'

const window = Dimensions.get('window')
const dim = Dimensions.get('screen')

export const Timer = () => {
  const dispatch = useAppDispatch()
  const data = useAppSelector((state) => state)
  const [workflow, setWorkflow] = useState<WorkflowItem[]>([])
  const { currentState } = data
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [currentWorkflowItem, setCurrentWorkflowItem] = useState<number>(-1)
  const [orientation, setOrientation] = useState(
    isPortrait() ? 'portrait' : 'landscape'
  )

  const isPaused = currentState === 'paused'

  useMount(() => {
    const _workflow = createWorkflow(data)
    let initialTime = 0
    if (_workflow.length) {
      initialTime = _workflow[0][1]
      setWorkflow(_workflow)
      setCurrentWorkflowItem(0)
      setCurrentTime(initialTime)
    }
  })

  useEffect(() => {
    const rotateHandler = () => {
      setOrientation(isPortrait() ? 'portrait' : 'landscape')
    }
    Dimensions.addEventListener('change', rotateHandler)
    return () => {
      Dimensions.removeEventListener('change', rotateHandler)
    }
  }, [])

  useInterval(
    () => {
      if (currentTime > 0) {
        setCurrentTime(currentTime - 1)
      } else {
        if (currentWorkflowItem < workflow.length - 1) {
          setCurrentWorkflowItem(currentWorkflowItem + 1)
          setCurrentTime(workflow[currentWorkflowItem + 1][1])
        } else {
          setCurrentWorkflowItem(-1)
          dispatch(stop())
        }
      }
    },
    isPaused ? null : 1000
  )

  return (
    <View>
      <Text style={style.currentWorkout}>
        {workflow.length &&
          currentWorkflowItem >= 0 &&
          getCurrentWorkoutLabel(workflow[currentWorkflowItem][0])}
      </Text>
      <Text
        style={orientation === 'portrait' ? style.text : style.textLandscape}
      >
        {formatTimeObject(toTimeObject(currentTime))}
      </Text>
    </View>
  )
}

const style = StyleSheet.create({
  currentWorkout: {
    color: '#fff',
  },
  text: {
    fontSize: 90,
    fontFamily: 'calculator',
    color: '#fff',
  },
  textLandscape: {
    fontSize: 200,
    fontFamily: 'calculator',
    color: '#fff',
  },
})
