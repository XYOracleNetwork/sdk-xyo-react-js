import { useState } from 'react'

export type RefreshCallback = () => boolean
export type DisableCallback = () => void

export const useRefresh = (): [boolean, RefreshCallback, DisableCallback] => {
  const [enabled, setEnabled] = useState(1)
  return [
    !!enabled,
    () => {
      const enabledCount = enabled + 1
      setEnabled(enabledCount)
      return !!enabledCount
    },
    () => setEnabled(0),
  ]
}
