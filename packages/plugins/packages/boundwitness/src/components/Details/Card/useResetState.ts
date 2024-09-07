import { useEffect, useState } from 'react'

/** A state that resets each time the initial value is changed */
export const useResetState = <T>(resetValue: T) => {
  const [value, setValue] = useState<T>(resetValue)
  useEffect(() => {
    // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
    setValue(resetValue)
  }, [resetValue])
  return [value, setValue] as const
}
