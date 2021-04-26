import { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'

const screen = Dimensions.get('screen')

export const useDimensions = () => {
  const [width, setWidth] = useState(screen.width)
  const [height, setHeight] = useState(screen.height)

  useEffect(() => {
    const rotateHandler = () => {
      const screen = Dimensions.get('screen')
      setWidth(screen.width)
      setHeight(screen.height)
    }
    Dimensions.addEventListener('change', rotateHandler)
    return () => {
      Dimensions.removeEventListener('change', rotateHandler)
    }
  }, [])

  return { width, height }
}
