import { useEffect } from 'react'

export const useMount = (callback?: () => void) => {
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (callback) {
      callback()
    }
  }, [])
}
