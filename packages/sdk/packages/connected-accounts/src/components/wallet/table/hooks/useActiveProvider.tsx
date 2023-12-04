import { Dispatch, SetStateAction, useState } from 'react'

import { ActiveProvider } from '../../lib'

export const useShowActiveProvider = (
  setActiveProvider: Dispatch<SetStateAction<ActiveProvider | undefined>>,
): [boolean, (activeProvider: ActiveProvider) => void, () => void] => {
  const [show, setShow] = useState(false)
  const onSetActiveProvider = (activeProvider: ActiveProvider) => {
    setShow(true)
    setActiveProvider(activeProvider)
  }

  const onClose = () => {
    setShow(false)
    setActiveProvider({})
  }

  return [show, onSetActiveProvider, onClose]
}
