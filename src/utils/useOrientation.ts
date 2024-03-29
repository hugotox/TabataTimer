import { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import { isPortrait } from 'utils/platform'

export const useOrientation = () => {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
    isPortrait() ? 'portrait' : 'landscape'
  )

  useEffect(() => {
    const rotateHandler = () => {
      setOrientation(isPortrait() ? 'portrait' : 'landscape')
    }
    const evt = Dimensions.addEventListener('change', rotateHandler)
    return () => {
      evt.remove()
    }
  }, [])

  return orientation
}
