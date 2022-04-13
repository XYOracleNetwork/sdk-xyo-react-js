import { WithChildren } from '@xylabs/sdk-react'
import { useEffect, useState } from 'react'
import Rollbar from 'rollbar'

import { RollbarContext } from './Context'

export interface RollbarProviderProps {
  instance: Rollbar
}

const RollbarProvider: React.FC<WithChildren<RollbarProviderProps>> = ({ children, instance }) => {
  const [rollbar, setRollBar] = useState<Rollbar>()

  useEffect(() => {
    if (instance) {
      setRollBar(instance)
    }
  }, [instance])

  return <RollbarContext.Provider value={{ rollbar }}>{children}</RollbarContext.Provider>
}

export { RollbarProvider }
