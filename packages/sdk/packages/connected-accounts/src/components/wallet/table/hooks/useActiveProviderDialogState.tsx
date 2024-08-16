import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'

import type { ActiveProvider } from '../../lib/index.ts'

export const useActiveProviderDialogState = (
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
