import { Dispatch, SetStateAction, useState } from 'react'

export const useDataState = <T>(defaultValue: T | undefined): [T | undefined, Dispatch<SetStateAction<T | undefined>>] => {
  const [state, setState] = useState(defaultValue)

  const setDataState: Dispatch<SetStateAction<T | undefined>> = (value: SetStateAction<T | undefined>) => {
    try {
      if (JSON.stringify(value) !== JSON.stringify(state)) {
        setState(value)
      }
    } catch {
      console.error('setDataState failed!  Make sure data type is stringifiable!')
    }
  }

  return [state, setDataState]
}
