import { useState } from 'react'

export type RefreshCallback = () => number
export type DisableCallback = () => void

export const useRefresh = (): [number, RefreshCallback, DisableCallback] => {
  const [count, setCount] = useState(1)
  return [
    count,
    () => {
      const newCount = count + 1
      setCount(newCount)
      return newCount
    },
    () => setCount(0),
  ]
}
