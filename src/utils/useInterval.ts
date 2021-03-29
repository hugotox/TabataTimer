import { useEffect, useRef } from 'react'

type CallBackFn = () => void

export const useInterval = (callback: CallBackFn, delay: number) => {
  const savedCallback = useRef<CallBackFn>()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback && savedCallback.current) {
        savedCallback.current()
      }
    }
    if (delay) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
